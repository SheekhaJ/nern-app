var neo = require('neo4j-driver').v1;

const url = 'bolt://localhost';

var driver = neo.driver(url, neo.auth.basic("neo4j", "password"), {maxTransactionRetryTime: 30000});
var session = driver.session()

var getUsers = () => {session.readTransaction(function(transaction){
    var result = transaction.run('match (u:user) return (u)');
    return result
}).then(function(result){
    session.close()
    result.records.map(record => console.log(record.get('u')))
}).catch(function(error){
    console.log('error: '+error)
})};

var getSkills = () => {session.readTransaction(function(transaction){
    var result = transaction.run('match(u:user)-[kRel:knows]->(l:language) return u,l');
    return result
}).then(function(result){
    session.close()
    result.records.forEach((record)=>console.log(`user "${record.get('u')}" knows "${record.get('l')}"`));
}).catch(function(error){
    console.log('error: '+error)
})};

driver.close()

module.exports.getUsers = getUsers;
module.exports.getSkills = getSkills;