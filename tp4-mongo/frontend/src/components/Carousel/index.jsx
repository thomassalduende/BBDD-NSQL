import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export function Carousels({ imagen = [] }) {
  console.log(imagen);
  const imageArray = Array.isArray(imagen) ? imagen : [imagen]; // Asegurar que siempre sea un array
  
  return (
    <Carousel>
      {imageArray.map((imageUrl, index) => (
        <Carousel.Item key={index} interval={1000}>
          <img
            className="d-block w-100"
            style={{ height: '300px', objectFit: 'cover' }}
            src={imageUrl}
            alt={`Slide ${index + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
