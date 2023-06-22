import React, { useState } from 'react'
import { Modal } from '../Modal/modal';
import { Form } from '../Form';

export function AgregarAirport() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className='flex justify-center mt-5 mb-2'>
        <button 
          className='bg-orange-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-orange-600'
          onClick={handleShow}
        >
          Agregar Airport
        </button>
      </div>

      {
        show
          ? <Modal
              title='Agregar Airport'
              show={show}
              onHide={handleClose}
            >
              <Form />
            </Modal>
          : null
      }
    </>
  )
}
