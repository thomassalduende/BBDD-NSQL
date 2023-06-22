import React, { useRef } from 'react'
import { postAirports } from '../../services/postAirports';
import Swal from 'sweetalert2';
import { updateAirports } from '../../services/updateAirports';
import { useParams } from 'react-router-dom';

export function FormUpdate({ aiport }) {

  const form = useRef()
  const { id } = useParams()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current);
    updateAirports(id, formData)
      .then(() => {
        window.location.reload(true)
        Swal.fire({
          icon: 'success',
          title: 'Aiport modificado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

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
          defaultValue={aiport.name}
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
          defaultValue={aiport.city}

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
          defaultValue={aiport.icao}

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
          defaultValue={aiport.lat}

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
          defaultValue={aiport.lng}

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
          defaultValue={aiport.tz}

        />
      </div>

      <button
        type="submit"
        className=" bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
    </form>
  </div>
  )
}
