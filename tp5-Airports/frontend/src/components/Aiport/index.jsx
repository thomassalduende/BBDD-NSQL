import React, { useEffect, useState } from 'react'
import { getAirports } from '../../services/getAirports'
import { useParams } from 'react-router-dom'
import { FormUpdate } from '../FormUpdate'
import { Modal } from '../Modal/modal'
import { deleteAirports } from '../../services/deleteAirports'
import Swal from 'sweetalert2'

export function Aiport() {
  const [aiport, setAiport] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const { id } = useParams()
  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    deleteAirports(id)
      .then(() =>{
        Swal.fire({
          icon: 'success',
          title: 'Aiport eliminado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  useEffect((id) => {
    getAirports(id)
      .then((res) => {
        setAiport(res)
        setLoading(true)
    })
  })

  return (
    <>
      {loading 
          ? <>  
            <h3>{aiport.name}</h3>
            <p>{aiport.city}</p>
            <p>{aiport.icao}</p>
            <p>{aiport.lat}</p>
            <p>{aiport.lng}</p>
            <p>{aiport.tz}</p>
            <button onClick={handleOpen}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
        </>
      : <p className='text-red-600 text-center'>Cargando...</p>}
    
    {
      open 
        ? <Modal
            title='Editar Airport'
            show={open}
            onHide={handleClose}
          >
            <FormUpdate aiport={aiport}/>
          </Modal>
        : null
    }
    </>


  )
}
