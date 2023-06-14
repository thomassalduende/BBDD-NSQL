import React, { useState } from 'react'
import { FormSuperheroes } from '../FormSuperheroes';
import { Modals } from '../Modal';

export default function AgregarSuperheroes() {

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="text-center">
        <button className="btn btn-primary mt-3 m-5" onClick={handleShow}>Cargar Superheroes</button>
      </div>

      {
        show 
        ? <Modals
            title='Agregar Superheroe'
            handleClose={handleClose}
            show={show}
          >
            <FormSuperheroes />
          </Modals>
        : null
      }
    </>
  )
}
