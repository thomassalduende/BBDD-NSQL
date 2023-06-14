import axios from "axios"

export const getMarvel = () => {
  const req = axios.get('http://localhost:3000/marvel')
  return req.then(response => response.data)
}