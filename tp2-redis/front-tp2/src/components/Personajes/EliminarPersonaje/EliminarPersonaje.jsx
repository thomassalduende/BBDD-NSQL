import { Modal } from "../Modal/Modal"
import { deletePersonaje } from "../../../service/Personaje/deletePersonaje"
import { useParams } from "react-router-dom"
import './eliminar.css'


export const EliminarPersonaje = ({eliminar, handleClose}) => {

    const { number_episode } = useParams()

    const handleDelete = () => {
        deletePersonaje(number_episode)
        .then(window.location.reload(true))
    }

    return(
        eliminar ? 
        <Modal
        title="Estas seguro que deseas eliminar?"
        isOpen={eliminar}
        onClose={handleClose}
        >
            <div className="container">
                <div className="containt">
                    <button className="cancelar" onClick={handleClose}>Cancelar</button>
                    <button className="confirmar" onClick={handleDelete}>Confirmar</button>
                </div>
            </div>
        </Modal>
        : null
    )
}