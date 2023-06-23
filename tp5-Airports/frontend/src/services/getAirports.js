import axios from "axios"

export const getAirports = (id) => {
  const res = axios.get(`http://localhost:3000/airport/${id}`)
  return res.then(response => response.data)
}