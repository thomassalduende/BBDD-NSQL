import axios from "axios"

export const getDc = () => {
  const req = axios.get('http://localhost:3000/dc')
  return req.then(response => response.data)
}