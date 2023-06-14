import React, { useEffect, useState } from 'react'
import { Superheroe } from '../Superheroe'
import { getSuperheroes } from '../../services/getSuperheroes'
import './index.css'
export function ListOfSuperheroes() {
  const [superheroes, setSuperheroes] = useState([])
  const [loading, setLoading] = useState(false)
   
  
  useEffect(() => {
    getSuperheroes()
     .then(res => {
        setSuperheroes(res)
        setLoading(true)
      })
  },[])
  
  return (
    <section className='section'>
      {
        loading
        ? superheroes.length > 1 
          ? superheroes.map((supers) => (
              <Superheroe superheroe={supers}/>
            ))
          : <p>No hay superheroes cargados...</p>
        : <p>Cargando...</p>
      }
    </section>
  )
}