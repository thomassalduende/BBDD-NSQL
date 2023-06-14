import axios from "axios"

export const getSuperheroe  = (id) => {
  const req = axios.get(`http://localhost:3000/superheroe/${id}`)
  return req.then(response => response.data)
}