import { useRef, useState } from "react"
import './formulario.css'
import { addPersonaje } from "../../../service/Personaje/addParsonaje"
import { addEpisode } from "../../../service/Episode/addEpisode"


export const Formulario = () => {

  const [error, setError] = useState('')
  const form = useRef()
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData(form.current)

    const formData = Object.fromEntries(Array.from(data.entries()).map(([name, value]) => [name, value]));

    if(formData.name_personaje !== '' && 
      formData.number_episode !== ''){
        console.log(formData)
        addPersonaje(formData)
        // // addEpisode(formData.episodio)
        .then(() => window.location.reload(true))

      }else{
        setError('Por favor, complete los campos')
      }
  }

    return(
      <form className="formulario" ref={form} onSubmit={handleSubmit}>
        <div className= "name">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name_personaje" placeholder="Ingrese nombre personaje"/>
        </div>
        <div className= "episode">
          <label>Episode:</label>
          <input type="text" name="number_episode" placeholder="Ingrese episodio"/>
        </div>
        {error && <p className="error">{error}</p>}
        <button className='button-guardar' type='submit'>Agregar</button>
      </form>
  )
}