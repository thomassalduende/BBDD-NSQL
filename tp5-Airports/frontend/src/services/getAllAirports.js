import axios from "axios"

export const getAllAirports = () => {
  const res = axios.get('http://localhost:3000/airports')
  return res.then(response => response.data)
}
