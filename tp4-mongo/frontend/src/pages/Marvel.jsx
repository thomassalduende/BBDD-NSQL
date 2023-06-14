import React, { useEffect, useState } from 'react'
import { getMarvel } from '../services/getMarvel'
import { Superheroe } from '../components/Superheroe'

export function Marvel() {
  const [superMarvel, setSuperMarvel] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getMarvel()
      .then(res => {
        setSuperMarvel(res)
        setLoading(true)
      })
  },[])
  return (
    <section className='section'>
      {
        loading 
        ? superMarvel.length > 1 
          ? superMarvel.map(supers => (
              <Superheroe superheroe={supers}/>
            ))
          : <p>No se encuentran superheroes de Marvel</p>
        : <p>Cargando...</p>
      }
    </section>
  )
}
