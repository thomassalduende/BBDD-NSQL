
const redis = require("redis")
var express = require('express')
const redisclient = redis.createClient({
    url: 'redis://db-redis-node:6379'
});
redisclient.connect()

var app = express()
  

redisclient.on('connect', function(){
    console.log("Connected to redis")
})

redisclient.on("ready", () => {
    console.log("Connected!")
});
  
redisclient.on("error", (err) => {
    console.log("Error in the Connection")
});


(async () => {
    redisclient.set('master', 'yoda')
    redisclient.lPush('lista_key', ['yoda', 'darth vader', 'mando', 'obi-wan kenobi'])
    
    const value = await redisclient.get("master")
    console.log(value)

    const result = await redisclient.lRange('lista_key', 0, -1)
    console.log(result)
})()


app.listen(3000, function(){
    console.log('Aplicación ejemplo, escuchando el puerto 3000!')
})