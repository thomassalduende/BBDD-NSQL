const { client } = require("../connection/index");

const db = client.db('airports');

const getAllAirports = async (req, res) => {
  try {
    const airports = await db.collection('airports').find().toArray();
    res.json(airports);
  } catch (error) {
    console.error('Error al obtener los airports:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los airports' });
  }
};

module.exports = { getAllAirports }