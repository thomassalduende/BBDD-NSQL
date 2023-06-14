import axios from "axios"

export const deleteSuperheroe  = (id) => {
  const req = axios.delete(`http://localhost:3000/delete/${id}`)
  return req.then(response => response.data)
}