import React from 'react'
import { ListOfSuperheroes } from '../components/ListOfSuperheroes'
import AgregarSuperheroes from '../components/AgregarSuperheroes'

export function Home() {
  return (
    <>
      <AgregarSuperheroes />
      <ListOfSuperheroes />
    </>
  )
}
