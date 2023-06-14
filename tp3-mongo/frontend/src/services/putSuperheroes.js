import axios from "axios"

export const putSuperheroes  = (id, newobject) => {
  const req = axios.put(`http://localhost:3000/superheroe/${id}/edit`, newobject)
  return req.then(response => response.data)
}