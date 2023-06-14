import axios from "axios"

export const getSuperheroes = () => {
  const req = axios.get('http://localhost:3000/superheroes')
  return req.then(response => response.data)
}