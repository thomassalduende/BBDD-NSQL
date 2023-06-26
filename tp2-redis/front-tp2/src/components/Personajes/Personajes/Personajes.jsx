import { useEffect, useState } from "react"
import { getPersonajes } from "../../../service/Personaje/getPersonajes"
import { EliminarPersonaje } from "../EliminarPersonaje/EliminarPersonaje"
import { getPersonajesEpisode } from "../../../service/Personaje/getPersonajesEpisode"
import './personajes.css'
import { useParams } from "react-router-dom"



export const Personajes = () => {
  const [personajes, setPersonajes] = useState([])
  const [capitulo, setCapitulo] = useState('')
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);


    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
    const cap = useParams()

    const handleClick = () => {
      getPersonajesEpisode(cap)
      .then(res => {
        setLoading(true)
        setPersonajes(res)
        console.log('cap1', res)
      })
      console.log(cap)
    }

    useEffect(() => {
      getPersonajes()
      .then(res => {
        setLoading(true)
        setPersonajes(res)
        console.log(res)
      })
    },[])

    const onChangeCapitulo = (e) => {
      setCapitulo(e.target.value);
    }

    return (
        <>
          <form>
            <label htmlFor="capitulo">Numero de Capitulo</label>
            <input type="text" id="capitulo" value={capitulo} onChange={onChangeCapitulo}/>
            <a href={`/${capitulo}`}>
              <button className="getPersonajes" type="button" onClick={handleClick}>Listar Personajes</button>
            </a>
          </form>
          {
          loading ? 
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Espisode</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {personajes.map(personaje => (
                  <tr key={personaje}>
                    <td>{personaje[1]}</td>
                    <td>{personaje[0]}</td>
                    <td>
                      <a href={`/${personaje[0]}`}>
                        <button className="button-eliminar" onClick={handleOpenModal}>Eliminar</button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          : <p>cargando</p>}
          {
            isModalOpen ? <EliminarPersonaje eliminar={handleOpenModal} handleClose={handleCloseModal}/> : null
          }
        </>
    )  
}