import axios from "axios"

export const putSuperheroes  = (id, newObject) => {
  const req = axios.put(`http://localhost:3000/edit/${id}`, newObject)
  return req.then(response => response.data)
}