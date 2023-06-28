import React, { useRef, useState } from 'react'
import { postAirports } from '../../services/postAirports';
import Swal from 'sweetalert2';

export function Form() {

  const form = useRef()
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    
    const formData = Object.fromEntries(
      Array.from(data.entries()).map(([name, value]) => [name, value])
    );

    // Verificar si todos los campos están completos
    if(
      formData.name !== '' &&
      formData.city !== '' &&
      formData.icao !== '' &&
      formData.lat !== '' &&
      formData.lng !== '' &&
      formData.tz !== '' 
    ){
      console.log(formData)
      postAirports(formData)
        .then(() => {
          window.location.reload(true);
          Swal.fire({
            icon: 'success',
            title: 'Airport agregado con éxito!',
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }else {
      setError('Complete todos los campos')
    }
  };

  return (
    <div className="w-[400px] mx-auto">
    <form ref={form} onSubmit={handleSubmit} className='flex flex-col'>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
          City
        </label>
        <input
          type="text"
          name="city"
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Enter your city"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="icao" className="block text-gray-700 font-bold mb-2">
          ICAO
        </label>
        <input
          type="text"
          name="icao"
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Enter ICAO code"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lat" className="block text-gray-700 font-bold mb-2">
          Latitude
        </label>
        <input
          type="text"
          name="lat"
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Enter latitude"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="lng" className="block text-gray-700 font-bold mb-2">
          Longitude
        </label>
        <input
          type="text"
          name="lng"
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Enter longitude"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="tz" className="block text-gray-700 font-bold mb-2">
          Timezone
        </label>
        <input
          type="text"
          name="tz"
          className="border border-gray-400 rounded px-4 py-2 w-full"
          placeholder="Enter timezone"
        />
      </div>
      {error && <p className='grid justify-center text-black-900 font-medium mb-2'>{error}</p>}
      <button
        type="submit"
        className=" bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        Agregar
      </button>
    </form>
  </div>
  )
}
