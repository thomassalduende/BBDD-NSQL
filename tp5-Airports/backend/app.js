const cors = require('cors')
const express = require('express');
const app = express()
require('./connection/index')


app.use(cors())
app.use(express.json());

const rutas = require('./rutas/rutas')

app.use(rutas)

app.listen(4000, function(){
    console.log('Aplicacion corriendo en el puerto 3000')
})