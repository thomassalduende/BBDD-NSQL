
const redisclient = require("./ConectRedis/connection")
const ruter = require("./rutas/rutas")
const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json());
app.use(ruter)

redisclient.connect()
  

redisclient.on('connect', function(){
    console.log("Connected to redis")
})

redisclient.on("ready", () => {
    console.log("Connected!")
});
  
redisclient.on("error", (err) => {
    console.log("Error in the Connection", err)
});


app.listen(3000, function(){
    console.log('Aplicación ejemplo, escuchando el puerto 3000!')
})