const { MongoClient } = require('mongodb')
const URI = 'mongodb://mongodb:27017';

// Create Instance of MongoClient for mongodb
const client = new MongoClient(URI)

// Connect to database
client.connect()
    .then(() => console.log('Conectado a la base de datos'))
    .catch(error => console.log('Conexion fallida', error))

module.exports =  { client }; 