import React from 'react';
import { AgregarAirport } from '../AgregarAirport';
export function Bienvenidos() {
  return (
    <section className='h-screen w-screen text-center relative overflow-hidden'>
      <div className='z-30 relative h-full flex flex-col'>
        <h2 className='pt-40 text-[40px] font-medium '>Clustering Map</h2>
        <AgregarAirport />
      </div>

      <div className='absolute top-0 left-0 right-0 bottom-0 z-10 overflow-hidden'>
        <img
          src="https://images.pexels.com/photos/163771/airport-airplanes-gates-flight-line-163771.jpeg?cs=srgb&dl=pexels-pixabay-163771.jpg&fm=jpg"
          alt="Imagen a pantalla completa"
          className="img-fluid w-screen h-screen object-cover"
        />
      </div>
    </section>
  );
}
