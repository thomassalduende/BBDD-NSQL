import Swal from 'sweetalert2';
import { updateAirports } from '../../services/updateAirports';
import { useRef } from 'react';


export function FormUpdate({ aiport }) {

  const form = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current);

    const capitalizedFormData = Object.fromEntries(
      Array.from(formData.entries()).map(([name, value]) => [name, value])
    );

    console.log(capitalizedFormData);
    updateAirports(aiport._id, capitalizedFormData)
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
    <div className="w-[100px] h-[350px]  z-999">
<form ref={form} onSubmit={handleSubmit} className="max-w-xs ml-[-10px]">
  <div className="mb-4">
    <label htmlFor="name" className="text-gray-700 font-bold mb-2 text-[10px]">
      Name
    </label>
    <input
      type="text"
      name="name"
      className="border border-gray-400 rounded h-[25px]  py-2 w-[130px]"
      placeholder="Enter your name"
      defaultValue={aiport.name}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="city" className="text-gray-700 font-bold mb-2 text-[10px]">
      City
    </label>
    <input
      type="text"
      name="city"
      className="border border-gray-400 rounded h-[25px]  py-2 w-[130px]"
      placeholder="Enter your city"
      defaultValue={aiport.city}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="icao" className="text-gray-700 font-bold mb-2  text-[10px]">
      ICAO
    </label>
    <input
      type="text"
      name="icao"
      className="border border-gray-400 rounded h-[25px]  py-2 w-[130px]"
      placeholder="Enter ICAO code"
      defaultValue={aiport.icao}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="lat" className="text-gray-700 font-bold mb-2 text-[10px]">
      Latitude
    </label>
    <input
      type="text"
      name="lat"
      className="border border-gray-400 rounded h-[25px]  py-2 w-[130px]"
      placeholder="Enter latitude"
      defaultValue={aiport.lat}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="lng" className="text-gray-700 font-bold mb-2 text-[10px]">
      Longitude
    </label>
    <input
      type="text"
      name="lng"
      className="border border-gray-400 rounded h-[25px]  py-2 w-[130px]"
      placeholder="Enter longitude"
      defaultValue={aiport.lng}
    />
  </div>

  <div className="mb-4">
    <label htmlFor="tz" className="text-gray-700 font-bold mb-2 text-[10px]">
      Timezone
    </label>
    <input
      type="text"
      name="tz"
      className="border border-gray-400 rounded h-[25px]  py-2 w-[130px]"
      placeholder="Enter timezone"
      defaultValue={aiport.tz}
    />
  </div>

  <button
    type="submit"
    className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-20 h-1/6 ml-4 rounded"
  >
    Update
  </button>
</form>

</div>

  )
}
