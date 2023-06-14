import React, { useEffect, useState } from 'react'
import { getDc } from '../services/getDc'
import { Superheroe } from '../components/Superheroe'

export function Dc() {
  const [superDc, setSuperDc] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getDc()
      .then(res => {
        setSuperDc(res)
        setLoading(true)
      })
  },[])
  return (
    <section className='section'>
      {
        loading 
        ? superDc.length > 1 
          ? superDc.map(supers => (
              <Superheroe superheroe={supers}/>
            ))
          : <p>No se encuentran superheroes de Dc</p>
        : <p>Cargando...</p>
      }
    </section>
  )
}

