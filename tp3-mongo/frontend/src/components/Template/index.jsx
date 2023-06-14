import React, { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { getSuperheroe } from '../../services/getSuperheroe';
import { putSuperheroes } from '../../services/putSuperheroes';
import { deleteSuperheroe } from '../../services/deleteSuperheroes';
import { Carousels } from '../Carousel/index'
import './index.css'

export function Template() {
  const [superheroe, setSuperheroe] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  const form = useRef()
  
  useEffect(() => {
    getSuperheroe(id)
      .then(res => {
        setSuperheroe(res)
        setLoading(true)
      })
  },[id])

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current);
    const capitalizedFormData = Object.fromEntries(
      Array.from(formData.entries()).map(([name, value]) => [name, value.toUpperCase()])
    );

    putSuperheroes(id, capitalizedFormData)
      .then(() => window.location.reload(true))
  }

  const handleDelete = () => {
    deleteSuperheroe(id)
      .then(() => window.location.reload(true))
  }

  return (
    loading 
      ? <div className='superheroe'>
          <Carousels className='imagen' imagen={superheroe.images[0][1]}/>
          <Form className='superheroe-data' ref={form} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label >Nombre</Form.Label>
              <Form.Control name='nombre' defaultValue={superheroe.nombre} type="text" />
              <Form.Label>Nombre Personaje</Form.Label>
              <Form.Control name='nombre_pers' defaultValue={superheroe.nombre_pers} type="text" />
              <Form.Label>Año Aparicion</Form.Label>
              <Form.Control name='año' defaultValue={superheroe.año_aparicion} type="text" />
              <Form.Label>Casa</Form.Label>
              <Form.Control name='casa' defaultValue={superheroe.casa} type="text" />
              <Form.Label>Biografia</Form.Label>
              <Form.Control name='biografia' defaultValue={superheroe.biografia} type="text" />
              <Form.Label>Equipamiento</Form.Label>
              <Form.Control name='equipamiento' defaultValue={superheroe.equipamiento} type="text" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Editar
            </Button>
            <Button className='boton-eliminar' variant="secondary" onClick={handleDelete}>
              Eliminar
            </Button>
          </Form>
        </div>
      : <p>Cargando...</p>
    
  )
}