import axios from 'axios'

export const getPersonajes = () => {
    const res = axios.get(`http://localhost:3000/personajes`)

    return res.then((response) => response.data)
}