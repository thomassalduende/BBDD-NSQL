import React, { useRef, useState } from 'react'
import { postAirports } from '../../services/postAirports';
import Swal from 'sweetalert2';

export function Form() {

  const form = useRef()
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    // Verificar si todos los campos están completos
    let isFormValid = true;
    const fieldsToValidate = ['name', 'city', 'icao', 'lat', 'lng', 'tz'];

    fieldsToValidate.forEach((field) => {
      const value = formData.get(field);
      if (!value) {
        isFormValid = false;
        setError('Completa todos los campos!')
        }
    });

    if (isFormValid) {
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
          id="name"
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
          id="city"
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
          id="icao"
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
          id="lat"
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
          id="lng"
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
          id="tz"
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
