const mongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'
let mongodb

function connect(callback){
    mongoClient.connect(url, (error, client) => {
        mongodb = client.db('email')
        callback()
    });
}
function get(){
    return mongodb
}

function close(){
    mongodb.close()
}

module.exports = {
    connect,
    get,
    close
}
