const redisclient = require("../ConectRedis/connection")


const agregarPersonaje = async (req, res) => {
  const { number_episode, name_personaje } = req.body;
  await redisclient.rPush('lista_key', JSON.stringify([ number_episode, name_personaje]));
  return res.send('Personaje creado con éxito')
}


const eliminarPersonaje = async (req, res) => {
  const { number_episode, name_personaje } = req.body;
  await redisclient.lRem("lista_key", 0, JSON.stringify([number_episode, name_personaje]))
  return res.send(`Personaje con numero de episodio ${number_episode} y nombre ${name_personaje} eliminado con éxito.`);
}

const getAllPersonajesEpisode = async (req, res) => {
  const { number_episode } = req.params;
  console.log(req.params)
  const allCharacters = await redisclient.lRange("lista_key", 0, -1)
  const charactersByNumber = []

  for (let i = 0; i < allCharacters.length; i++) {
    const character = JSON.parse(allCharacters[i])
    if(character[0] === number_episode){
      charactersByNumber.push(JSON.parse(allCharacters[i]))
    }    
  }
  return res.send(charactersByNumber)
}

const getAllPersonajes = async (req, res) => {
  const response = await redisclient.lRange("lista_key", 0, -1)
  const characters = response.map(item => {
    try {
      return JSON.parse(item);
    } catch (err) {
      console.error(`Error al parsear ${item}: ${err.message}`);
      return null;
    }
  }).filter(item => item !== null);
  
  return res.send(characters)
}

module.exports = {agregarPersonaje, eliminarPersonaje, getAllPersonajes, getAllPersonajesEpisode}
