const express = require('express');
const cors = require('cors');


const { MongoClient } = require('mongodb');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


// URL de conexión a MongoDB
const URL = 'mongodb://mongodb:27017';

// Create Instance of MongoClient for mongodb
const client = new MongoClient(URL)
const db = client.db('superheroes')
var ObjectId = require('mongodb').ObjectId;


client.connect()
  .then(() => {
    console.log('Conexión exitosa a MongoDB');

    // Funciones de controlador
    const getAllPersonajes = async (req, res) => {
      try {
        const personajes = await db.collection('personajes').find().toArray();
        res.json(personajes);
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los personajes' });
      }
    };

    const getPersonajeMarvel = async (req, res) => {
      try {
        const personajes = await db.collection('personajes').find({ casa: 'marvel' }).toArray();
        res.json(personajes);
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los personajes' });
      }
    };

    const getPersonajeDc = async (req, res) => {
      try {
        const personajes = await db.collection('personajes').find({ casa: 'dc' }).toArray();
        res.json(personajes);
      } catch (error) {
        console.error('Error al obtener los personajes:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener los personajes' });
      }
    };

    const getPersonajesId = async (req, res) => {
      const { id } = req.params;
      try {
        const personaje = await db.collection('personajes') .findOne({ _id: new ObjectId(id)})
        console.log(personaje)
        if (!personaje) {
          res.status(404).json({ error: 'Personaje no encontrado' });
          return;
        }
        res.json(personaje);
      } catch (error) {
        console.error('Error al obtener el personaje:', error);
        res.status(500).json({ error: 'Ocurrió un error al obtener el personaje' });
      }
    };

    const createPersonaje = async (req, res) => {
      const { nombre, nombre_pers, biografia, año_aparicion, casa, equipamiento, images } = req.body;
    
      try {
        const newPersonaje = {
          nombre,
          nombre_pers,
          biografia,
          año_aparicion,
          casa,
          equipamiento,
          images: images
        };
    
        console.log(newPersonaje);
        const result = await db.collection('personajes').insertOne(newPersonaje);
        newPersonaje._id = result.insertedId;
        res.status(201).json(newPersonaje);
      } catch (error) {
        console.error('Error al crear el personaje:', error);
        res.status(500).json({ error: 'Ocurrió un error al crear el personaje' });
      }
    };
    

    const updatePersonaje = async (req, res) => {
      const { id } = req.params;
      let updates = req.body;
      // Excluir el campo "images" del objeto "updates"
      const { images, ...otherUpdates } = updates;
    
      try {
        const result = await db.collection('personajes').updateOne(
          { _id: new ObjectId(id)},
          { $set: otherUpdates }
        );
        if (result.matchedCount === 0) {
          res.status(404).json({ error: 'Personaje no encontrado' });
          return;
        }
        console.log(result);
        res.json({ message: 'Personaje actualizado correctamente' });
      } catch (error) {
        console.error('Error al actualizar el personaje:', error);
        res.status(500).json({ error: 'Ocurrió un error al actualizar el personaje' });
      }
    };
    
    const deletePersonaje = async (req, res) => {
      const { id } = req.params;
      try {
        const result = await db.collection('personajes').deleteOne({ _id: new ObjectId(id)});
        if (result.deletedCount === 0) {
          res.status(404).json({ error: 'Personaje no encontrado' });
          return;
        }
        res.json({ message: 'Personaje eliminado correctamente' });
      } catch (error) {
        console.error('Error al eliminar el personaje:', error);
        res.status(500).json({ error: 'Ocurrió un error al eliminar el personaje' });
      }
    };

    // Rutas
    app.get('/superheroes', getAllPersonajes);
    app.get('/marvel', getPersonajeMarvel);
    app.get('/dc', getPersonajeDc);
    app.get('/superheroe/:id', getPersonajesId);
    app.post('/add',createPersonaje);
    app.put('/edit/:id', updatePersonaje);
    app.delete('/delete/:id', deletePersonaje);

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
  });


