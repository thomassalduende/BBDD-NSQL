const { client } = require("../connection/index");

const db = client.db('airports-tp5');

var ObjectId = require('mongodb').ObjectId;

const getAllAirports = async (req, res) => {
  try {
    const airports = await db.collection('airports').find().toArray();
    res.json(airports);
  } catch (error) {
    console.error('Error al obtener los airports:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los airports' });
  }
};

const getAirportsId = async (req, res) => {
  const { id } = req.params;
  try {
    const personaje = await db.collection('airports') .findOne({ _id: new ObjectId(id)})
    console.log(personaje)
    if (!personaje) {
      res.status(404).json({ error: 'Airports no encontrado' });
      return;
    }
    res.json(personaje);
  } catch (error) {
    console.error('Error al obtener el personaje:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener el personaje' });
  }
};

const createAirport = async (req, res) => {
  const { name, city, iata_faa, icao, lat, lng, alt, tz } = req.body;

  try {
    const newAirport = {
      name,
      city, iata_faa,
      icao, 
      lat,
      lng,
      alt,
      tz
    };

    console.log(newAirport);
    const result = await db.collection('airports').insertOne(newAirport);
    newAirport._id = result.insertedId;
    res.status(201).json(newAirport);

  } catch (error) {
    console.error('Error al crear el airport:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el airport' });
  }
};


const updateAirport = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await db.collection('airports').updateOne(
      { _id: new ObjectId(id)},
      { $set: updates }
    );
    if (result.matchedCount === 0) {
      res.status(404).json({ error: 'Airports no encontrado' });
      return;
    }
    console.log(result);
    res.json({ message: 'Airports actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el airport:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el airport' });
  }
};

const deleteAirport = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.collection('airports').deleteOne({ _id: new ObjectId(id)});
    if (result.deletedCount === 0) {
      res.status(404).json({ error: 'Airport no encontrado' });
      return;
    }
    res.json({ message: 'Airport eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el airport:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el airport' });
  }
};


module.exports = { getAllAirports, getAirportsId, createAirport, updateAirport, deleteAirport }