var neo = require('neo4j-driver').v1;
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var fs = require('fs')
var multer = require('multer')
var upload = multer({ dest: './uploads/' });

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

router.post('/login', (req, res) => {
    var email = req.body.payload;
    console.log('post login ',email)
    session.readTransaction(function(transaction) {
        var result = transaction.run("match (u:user{email: '" + email + "'}) return u.id, u.firstName, u.lastName");
        return result;
      })
      .then(result => {
        if (result.records.length === 1) {
            return res.json(result);
        } else {
            console.error('something odd during login return ', result);
            return res.json({ message: 'failed login' });
        }
      })
      .catch(error => {
        console.log("error: ", error);
      })
        .finally(() => {
          session.close();
      });
})

router.get('/users', (req, res)=>{
    session.readTransaction(function(transaction){
        var result = transaction.run('match (u:user) return u.id,u.firstName,u.lastName,u.email,u.githubUrl,u.linkedinUrl order by u.degree desc');
        return result
    }).then(function(result){
        session.close();
        return res.json({result})
    }).catch(function(error){
        console.log('users error: '+error);
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
            var result = transaction.run("match (u:user)-[k:knows]->(l:language) where l.name=~'(?i)"+q+"'  return u.id,u.firstName,u.lastName,u.email,u.githubUrl,u.linkedinUrl order by u.degree desc");
            return result
        }).then(function(result){
            session.close();
            return res.json({result})
        }).catch(function(error){
            console.log('query error: '+error);
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
    
    session.writeTransaction(function (transaction) {
        var result = transaction.run("merge (u:user{firstName:'" + firstName + "', lastName:'" + lastName + "', email:'" + email + "', githubUrl: '" + githubUrl + "', linkedinUrl:'" + linkedinUrl + "'}) return u");
        // var temp =  transaction.run(
        //   'call algo.degree.stream("user","friendOf",{direction:"outgoing"}) yield nodeId,score return algo.asNode(nodeId).firstName as name, score as followers order by followers desc'
        // );
        // console.log(temp)
        return result
    }).then(result => {
        if (result.summary.counters.nodesCreated() === 1) {
            console.log("query executed - ", result.summary.statement.text);
        } else {
            console.err('something weird happened while adding a single new user!');
        }
    }).catch(error => {
        console.log('error: ', error)
    }).finally((result) => {
        session.close();
        return res.json({ result });
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
    // if (userid != "") {
      session
        .readTransaction(function(transaction) {
          var result = transaction.run(
            "match (u:user{id:'"+userid+"'})-[r]-(f) return u,r,f"
            );
            
          return result
        })
        .then(function(result) {
            // console.log('profile result from server: ', result);
            return res.json(result);
        })
        .catch(function(error) {
          console.log("get user profile error 3213: " + error);
        }).finally((result) => {
            session.close();
        });
    // } else {
    //   res.json({ res: q });
    // }
  // session
  //   .readTransaction(function(transaction) {
  //     var result = transaction.run(
  //       "match (u:user) return u.id,u.firstName,u.lastName,u.email,u.githubUrl,u.linkedinUrl order by u.degree desc"
  //     );
  //     return result;
  //   })
  //   .then(function(result) {
  //     session.close();
  //     return res.json({ result });
  //   })
  //   .catch(function(error) {
  //     console.log("users error: " + error);
  //   });
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

driver.close()

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(router);
var server = app.listen(apiPort, ()=>console.log(`Listening on port ${apiPort}`));
server.setTimeout(10000);