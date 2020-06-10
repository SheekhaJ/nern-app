var neo = require('neo4j-driver').v1;
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var fs = require('fs')
var multer = require('multer')
var upload = multer({ dest: './uploads/' });
const bcrypt = require('bcryptjs');

const url = 'bolt://localhost';

var driver = neo.driver(url, neo.auth.basic("neo4j", "password"), {maxTransactionRetryTime: 30000});
var session = driver.session()
const apiPort = 3001;
const app = express();
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

var db = mongoose.connection;

var userProfileSchema = new Schema({
    id: String,
    // firstName: String,
    // lastName: String,
    image: Buffer
}, {
    timestamps: true
});
var userProfile = mongoose.model('Profiles', userProfileSchema);

async function tempSleep(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

router.get('/',(req,res) => {
    return res.json({message: 'Welcome to ERS at GET /'});
})

router.post('/login', (req, res) => {
    var email = req.body.loginusername;
    var password = req.body.loginpassword;
    // console.log('post login ', email, password)
    
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            
            session.readTransaction(function (transaction) {
                // console.log('email, pwd: ', email, hash);
                var result = transaction.run("match (u:user{email: '" + email + "'}) return u.id, u.firstName, u.lastName, u.pwd");
                return result;
            })
                .then(result => {
                    var record = result.records[0]
                    var dbhash = record.get('u.pwd')

                    bcrypt.compare(password, dbhash, function (err, compareres) {
                        // console.log('result after comparison - ', compareres, record);
                        if (compareres) {
                            var responseObj = {
                                userid: record.get('u.id'),
                                firstName: record.get('u.firstName'),
                                lastName: record.get('u.lastName')
                            }
                            return res.json({ responseObj });
                        } else {
                            res.json({ message: 'faied login!' });
                        }
                    })

                    // if (result.records.length === 1) {
                    //     return res.json(result);
                    // } else {
                    //     console.error('something odd during login return ', result);
                    //     return res.json({ message: 'failed login' });
                    // }
                })
                .catch(error => {
                    console.log("error: ", error);
                })
                .finally(() => {
                    session.close();
                });
        })
    })

})

router.get('/users', (req, res)=>{
    session.readTransaction(function(transaction){
        var result = transaction.run('match (u:user) return u.id,u.firstName,u.lastName,u.email,u.githubUrl,u.linkedinUrl order by u.degree desc');
        return result
    }).then(function(result){
        return res.json({result})
    }).catch(function(error){
        console.log('users error: '+error);
    }).finally(function (result) {
        session.close();
    })
});

router.get('/skills', (req, res)=>{
    session.readTransaction(function(transaction){
            var result = transaction.run('match(u:user)-[kRel:knows]->(l:language) return u.firstName,u.lastName,u.email,u.githubUrl,u.linkedinUrl,l.name');
            return result
        }).then(function(result){
            session.close();
            return res.json({result})
            // result.records.forEach((record)=>console.log(`user "${record.get('u')}" knows "${record.get('l')}"`));
        }).catch(function(error){
            console.log('skills error: '+error);
        })
});

router.get('/query', (req,res)=>{
    q = req.query.q
    console.log('query q is "'+q+'"');
    if (q!=''){
        session.readTransaction(function(transaction){
            return transaction.run("match (u:user)-[k:knows]->(l:language) where l.name=~'(?i)"+q+"' return u.id,u.firstName,u.lastName,u.email,u.githubUrl,u.linkedinUrl order by u.outDegree desc");
        }).then(function (result) {
            console.log('result of query search - ',result)
            return res.json({result})
        }).catch(function(error){
            console.log('query error: '+error);
        }).finally(() => {
            session.close();
        })
    } else {
        res.json({res: q});
    }
});

router.post('/adduser', (req, res) => {
    var firstName = req.body.data.firstName;
    var lastName = req.body.data.lastName;
    var email = req.body.data.email;
    var githubUrl = req.body.data.githubUrl;
    var linkedinUrl = req.body.data.linkedinUrl;

    var results = null;

    //Add new user
    session.run("merge (u:user{firstName:'" + firstName + "', lastName:'" + lastName + "', email:'" + email + "', githubUrl: '" + githubUrl + "', linkedinUrl:'" + linkedinUrl + "'}) return u, id(u) as defaultuserid")
        .then(addNewUserResult => {
            var defaultuserid = addNewUserResult.records[0].get('defaultuserid').toString();
            var userDetails = addNewUserResult.records[0].get('u').properties;
            console.log('add user result - ', defaultuserid);
            results = { ...results, 'addUser': userDetails };
            
            var numOfUsers = null;
            //Update stats node to account for the newly added user
            session.run("match (s:stats{name:'user'}), (u:user) with s, count(u) as numOfUsers call apoc.create.setProperty(s,'count',numOfUsers) yield node return node")
                .then(updateUserStatsResult => {
                    numOfUsers = updateUserStatsResult.records[0].get('node');
                    var newUserid = numOfUsers.properties['count'].toString();
                    console.log('update user stats result - ', newUserid);
                    
                    //Set id for the newly added user based on the updated number of users from the stats node
                    session.run("match (u:user{firstName:'" + firstName + "'}) where id(u)=" + defaultuserid + " and not exists(u.id) set u.id='" + newUserid + "', u.pwd='$2a$10$XGtM7IxEYM2cAhalrZEVcOQx1zG8PpCz.Kh8UfyWwX9s.Xe8dZZZW' return u.id")
                        .then(setUseridResult => {
                            console.log('set userid - ', setUseridResult.records[0].get('u.id').toString());
                            results = { ...results, 'newUserid': newUserid };
                            
                            // return res.json({ results });
                            console.log('results in setting id for newly added user - ', results);
                            return res.json(results);
                        }).catch(setUseridError => {
                            console.log('set newuserid error - ', setUseridError);
                        })
                    
                    //Setting in-degree of the new user
                    session.run("match (u:user{id:'"+newUserid+"'})<-[f:friendOf]-(v:user) with size(collect((u)<-[:friendOf]-(v))) as inDegree,u set u.inDegree = toString(inDegree) return u")
                        .then(setInDegreeResult => {
                            console.log('set inDegree result of new user - ', setInDegreeResult);
                        }).catch(setInDegreeError => {
                            console.log('set inDegree error of new user - ', setInDegreeError);
                        })
                    
                    //Setting out-degree of the new user
                    session.run("match (u:user{id:'"+newUserid+"'})-[f:friendOf]->(v:user) with size(collect((u)-[:friendOf]->(v))) as outDegree,u set u.outDegree = toString(outDegree) return u")
                        .then(setOutDegreeResult => {
                            console.log('set outDegree result of new user - ', setOutDegreeResult);
                        }).catch(setOutDegreeError => {
                            console.log('set outDegree error of new user - ', setOutDegreeError);
                        })

                }).catch(updateUserStatsError => {
                    console.log('update user stats error - ', updateUserStatsError);
                });
        }).catch(addNewUserError => {
            console.log('add user error - ', addNewUserError)
        });

});

router.get('/user', (req, res) => {
    // console.log('got the req at /user route - ', req);
    userProfile.findById('5e06f44a2f74b6409cdae4c4', function (err, img, next) {
        if (err) {
            return next(err);
        }
        // console.log('img: ', img);
        res.contentType('png');
        res.send(Buffer.from(img.image.buffer).toString('base64'));
    })
    return res;
})

router.post("/user", (req, res) => {
    userid = req.body.payload;
    console.log('userid is "' + userid + '"');

    session.readTransaction((transaction) => {
        var result = null;
        var temp = transaction.run("match (u:user{id:'" + userid + "'}) return u")
            .then(txresult1 => {
                // console.log('txresult1 - ', txresult1.records[0]);
                result = { ...result, userProfile: txresult1 };
                return result
            })
            .then(() => {
                return transaction.run("match (u:user{id:'" + userid + "'})-[k:knows]->(v) return u,k,v")
                    .then(txresult2 => {
                        // console.log('txresult2 - ', txresult2.records);
                        result = { ...result, languages: txresult2 };
                        return result
                    }).catch(txerror2 => {
                        console.log('tx2 error - ', txerror2);
                    })
            })
            .then(() => {
                return transaction.run("match (u:user{id:'" + userid + "'})-[f:friendOf]->(v) return u,f,v")
                    .then(txresult3 => {
                        // console.log('txresult3 - ', txresult3.records);
                        result = { ...result, friends: txresult3 };
                        return result
                    }).catch(txerror3 => {
                        console.log('error from tx3 - ', txerror3);
                    })
            }).catch(txerror1 => {
                console.log('tx1 error - ', txerror1);
        })
        return temp
    }).then(result => {
        // console.log('combined result - ', result)
        return res.json({ result });
    }).catch(error => {
        console.log("/user error: " + error);
    }).finally((result) => {
        session.close();
    });
    
});


router.post('/profile', upload.single('avatar'), (req, res) => {
    console.log('at profile route!');
    db.once('open', () => {
        console.log('connection to mongodb is now open!')
    })
    db.on('error', (err) => {
        console.error('error while connecting to mongodb database test. err: ',err)
    })
    // var userProfile = mongoose.model('Profiles', userProfileSchema);

    var user = new userProfile
    user.id = new Date(Date.now());
    user.image = fs.readFileSync(req.file.path);
    user.save();

    return res.json({message: 'Successful file upload!'})
})

router.post('/friends', (req, res) => {
    userid = req.body.payload
    session.
        readTransaction(function (transaction) {
            var result = transaction.run(
                "match (u:user{id:'" + userid + "'}),(v:user) where not (u)-[:friendOf]->(v) and v.id <> '" + userid + "' return v"
            );

            return result
        })
        .then(function (result) {
            // console.log('friends from database - ', result);
            return res.json({ result });
        })
        .catch(function (error) {
            console.log("get user's friends error: ", error)
        }).finally(function (result) {
            session.close();
        })
});

router.post('/addfriends', (req, res) => {
    var userid = req.body['userid']
    var friendsids = req.body['friendsids']
    // console.log('userid and friendsids are ', userid, friendsids);
    var results = new Map();

    // for (var i = 0; i < friendsids.length; i++) {
        var friendid = friendsids;

        // session.run("match (u:user{id:'" + userid + "'})-[f:friendOf]-(v:user{id:'" + friendid + "'}) return f.id")
        //     .then(existingFriendRelResult => {
        //         if (existingFriendRelResult.records.length>0){
        //             results[friendid] = existingFriendRelResult.records[0].get('f.id').toString();
        //         }
        //         console.log('results[friendid] - ', results);
        //     }).catch(existingFriendRelError => {
        //         console.log('existing friend error - ', existingFriendRelError);
        // })

        // 1) Get number of friendsOf relations
        var numOfFriendsRelations = null;
        var newFriendRelationId = null;
        var createFriendRelationPromise = null, updateStatsPromise = null;

        // var friendCountPromise = session.run("match (s:stats{name:'friendOf'}) return s.count")
    session.run("match (s:stats{name:'friendOf'}) return s.count")
            .then(friendsCountResult => {
                numOfFriendsRelations = friendsCountResult.records[0].get('s.count').toString()

                // 2) Create new incremented id to assign to the new relation
                newFriendRelationId = 'friend' + (parseInt(numOfFriendsRelations) + 1)

                results[friendid] = newFriendRelationId;
                
                // 3) Create the new relation with the newly created id
                // createFriendRelationPromise = session.run("match (u:user{id:'" + userid + "'}), (v:user{id:'" + friendid + "'}) where not exists((u)-[:friendOf]->(v)) with u,v call apoc.create.relationship(u,'friendOf',{id:'" + newFriendRelationId + "'},v) yield rel return rel")
                session.run("match (u:user{id:'" + userid + "'}), (v:user{id:'" + friendid + "'}) where not exists((u)-[:friendOf]->(v)) with u,v call apoc.create.relationship(u,'friendOf',{id:'" + newFriendRelationId + "'},v) yield rel return rel")
                    .then(createFriendsRelationResult => {
                        console.log('create friends relation result - ', createFriendsRelationResult);

                        // 4) Update the stats friendOf node with the new count of relationships
                        // updateStatsPromise = session.run("match (s:stats{name:'friendOf'}), ()-[f:friendOf]-() with s, count(f) as countFriendRels call apoc.create.setProperty(s,'count',countFriendRels)yield node return node")
                        session.run("match (s:stats{name:'friendOf'}), ()-[f:friendOf]-() with s, count(f) as countFriendRels call apoc.create.setProperty(s,'count',countFriendRels)yield node return node")
                            .then(updateFriendOfRelsStatsResult => {
                                console.log('updateFriendOfRelsStatsResult - ', updateFriendOfRelsStatsResult.summary)
                            }).catch(updateFriendOfRelsStatsError => {
                                console.log('updateFriendOfRelsStatsError - ', updateFriendOfRelsStatsError);
                            })

                        return res.json(results);
                        // if (friendsids.length == results.length) {
                        //     console.log('returning results - ', results);
                        //     return res.json(results);
                        // }
                        
                    }).catch(createFriendsRelationError => {
                        console.log('create friends relation error - ', createFriendsRelationError);
                    })
            }).catch(addFriendsError => {
                console.log('addfriends error - ', addFriendsError);
            })
         
        // console.log('in here i - ', i);
        // Promise.all([friendCountPromise, createFriendRelationPromise, updateStatsPromise])
        //     .then(valuesResult => {
        //         console.log('/addfriends result at the end of Promise.all - ', valuesResult);
        //     }).catch(valuesError => {
        //         console.log('/addfriends error at the end of Promise.all - ', valuesError)
        //     }).finally(() => {
        //         console.log('/addfriends finally - and of promise.all - ');
        //         session.close();
        // })
        
    // }

    // tempSleep(1400);
    // if (results.length ==)
    // return res.json({ 'message': 'Success' });
})

router.post('/getuserratings', (req, res) => {
    var loggedinuserid = req.body.loggedinuserid
    var profileuserid = req.body.profileuserid
    session.readTransaction(function (transaction) {
        return transaction.run("match (u:user{id:'"+loggedinuserid+"'})-[r:rates]->(v:user{id:'"+profileuserid+"'}) return u,r,v")
    }).then(function (result) {
        // console.log('/getuserratings result - ', result);
        return res.json({ result });
    }).catch(function (error) {
        console.log('/getuserratings error - ', error);
    }).finally(() => {
        session.close();
    })
})

router.get('/getskill', (req, res) => {
    session.readTransaction(function (transaction) {
        return transaction.run("match (l:language) return l order by l.inDegree desc limit 10");
    }).then(function (result) {
        // console.log('result /getskill - ', result.records)
        return res.json({result})
    }).catch(function (error) {
        console.log('/getskill error - ', error);
    }).finally(() => {
        session.close();
    })
})

driver.close()

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(router);
var server = app.listen(apiPort, ()=>console.log(`Listening on port ${apiPort}`));
server.setTimeout(10000);