import axios from "axios"

export const postSuperheroes = (newObject) => {
  const req = axios.post('http://localhost:3000/superheroes/add', newObject)
  return req.then(response => response.data)
}