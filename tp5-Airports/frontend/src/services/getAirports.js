import axios from "axios"

export const getAirports = (id) => {
  const res = axios.get(`http://localhost/airport/${id}`)
  return res.then(response => response.data)
}