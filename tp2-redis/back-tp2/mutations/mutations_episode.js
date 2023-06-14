const redisclient = require("../ConectRedis/connection")


const agregarEpisodio = async (req, res) => {
    try {
      //Seteamos el valor disponible como default
      let status = 'available';
      //Requerimos del body los datos de la request
      const { number_episode, name_episode } = req.body;
      //Cargamos en la lista mandalorian el episodio.
      await redisclient.rPush('mandalorian', JSON.stringify([number_episode, name_episode, status]));
      return res.send('Episodio de mandalorian creado con éxito.')
    } catch (error) {
      return res.status(400).send({error: error.message})
    }
}

module.exports = {agregarEpisodio}