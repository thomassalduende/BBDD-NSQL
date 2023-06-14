const { agregarPersonaje, eliminarPersonaje, getAllPersonajes, getAllPersonajesEpisode } = require("../mutations/mutations_personaje")
const { agregarEpisodio } = require("../mutations/mutations_episode")

const Router = require("express")

const ruter = Router()

ruter.post('/add/personaje', agregarPersonaje)
ruter.delete('/delete/personaje', eliminarPersonaje)
ruter.get('/personajes', getAllPersonajes)
ruter.get('personajes/episode', getAllPersonajesEpisode)

ruter.post('add/episode', agregarEpisodio)


module.exports = ruter;







