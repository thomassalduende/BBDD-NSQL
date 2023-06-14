import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Formulario } from "../FormAgregar/Formulario"
import './agregar.css'


export const Agregar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    
  return (
    <>
    <div className="container">
      <button onClick={handleOpenModal}>
        Agregar Personaje
      </button>
    </div>
    {
        isModalOpen ? 
        <Modal title="Agregar Personaje" isOpen={handleOpenModal} onClose={handleCloseModal}>
            <Formulario/>
        </Modal>
        : null
    }
    </>
  )
}