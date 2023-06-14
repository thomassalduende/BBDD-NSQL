import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export function Carousels({ imagen }) {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={imagen}
          alt="First slide"
        />
      </Carousel.Item>
   </Carousel>
  )
}
