var neo = require('neo4j-driver').v1;
const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');

const url = 'bolt://localhost';

var driver = neo.driver(url, neo.auth.basic("neo4j", "password"), {maxTransactionRetryTime: 30000});
var session = driver.session()
const apiPort = 3001;
const app = express();
const router = express.Router();

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
            console.log('skills error: '+error);
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
        return transaction.run("merge (u:user{firstName:'" + firstName + "', lastName:'" + lastName + "', email:'" + email + "', githubUrl: '" + githubUrl + "', linkedinUrl:'" + linkedinUrl + "'}) return u");
    }).then(result => {
        if (result.summary.counters.nodesCreated() === 1) {
            console.log("query executed - ", result.summary.statement.text);
        } else {
            console.err('something weird happened while adding a single new user!');
        }
    }).catch(error => {
        console.log('error: ', error)
    }).finally((result)=>{
        session.close();
        return res.json({ result });
    });
})

driver.close()

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());
app.use(router);
var server = app.listen(apiPort, ()=>console.log(`Listening on port ${apiPort}`));
server.setTimeout(10000);

// module.exports.getUsers = getUsers;
// module.exports.getSkills = getSkills;