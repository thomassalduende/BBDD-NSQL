const {req,res} = require('express')


const Personaje = require('../schema')



const getAllPersonajes = async (req, res) => {
  try {
    const personajes = await Personaje.find({});
    res.json(personajes);
  } catch (error) {
    console.error('Error al obtener los personajes:', error);
    res.status(500).json({ error: 'Ocurrió un error al obtener los personajes' });
  }
};


const getPersonajeMarvel = async (req, res) => {
    try {
      const personajes = await Personaje.find({ casa: 'marvel' });
      res.json(personajes);
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los personajes' });
    }
}


const getPersonajeDc = async (req, res) => {
    try {
      const personajes = await Personaje.find({ casa: 'dc' });
      res.json(personajes);
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los personajes' });
    }
}

const getPersonajesId = async(req, res) => {

  const { id } = req.params;

  try{
    const personajes = await Personaje.findById(id)
    res.json(personajes)
  } catch(err){
    console.error('Error al obtener los personajes:', err);
      res.status(400).json({ error: 'Ocurrió un error al obtener los personajes' });
  }
}


const createPersonaje = async (req, res) => {


  console.log('req: ', req.body)
  const {nombre, nombre_pers, biografia, año_aparicion, casa, equipamiento, images} = req.body;

  // const personaje = await Personaje.({
  //   nombre, nombre_pers, biografia, año_aparicion, casa, equipamiento, images
  // })

  // res.status(201).json(personaje)

  
  try {
    const newPersonaje = new Personaje({
      nombre,
      nombre_pers,
      biografia,
      año_aparicion,
      casa,
      equipamiento,
      images
    });
    
    await newPersonaje.save();
    res.status(201).json(newPersonaje);
  } catch (error) {
    console.log('Error al crear el personaje:', error);
    res.status(500).json({ error: 'Ocurrió un error al crear el personaje' });
  }
};

const updatePersonaje = async (req, res) => {
  try {
    const personajeId = req.params.id;
    const updates = req.body;

    const personajeActualizado = await Personaje.findByIdAndUpdate(
      personajeId,
      updates,
      { new: true }
    );

    if (!personajeActualizado) {
      res.status(404).json({ error: 'Personaje no encontrado' });
      return;
    }

    res.json(personajeActualizado);
  } catch (error) {
    console.error('Error al actualizar el personaje:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar el personaje' });
  }
};


const deletePersonaje = async (req, res) => {
  try {
    const personajeId = req.params.id;

    const personajeEliminado = await Personaje.findByIdAndRemove(personajeId);

    if (!personajeEliminado) {
      res.status(404).json({ error: 'Personaje no encontrado' });
      return;
    }

    res.json({ message: 'Personaje eliminado correctamente' });
  } catch (error) {
    console.log('Error al eliminar el personaje:', error);
    res.status(500).json({ error: 'Ocurrió un error al eliminar el personaje' });
  }
};


module.exports = {getAllPersonajes, getPersonajeDc, getPersonajeMarvel, getPersonajesId, createPersonaje, updatePersonaje, deletePersonaje}



  
  
  