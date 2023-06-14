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

  const { number_episode } = useParams()
  
  const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleClick = () => {
      getPersonajesEpisode(number_episode)
      .then(res => {
        setLoading(true)
        setPersonajes(res)
      })
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
            <button className="getPersonajes" type="button" onClick={handleClick}>Listar Personajes</button>
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