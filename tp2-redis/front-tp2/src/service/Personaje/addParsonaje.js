import axios from 'axios'

export const addPersonaje = (personaje) => {
    const res = axios.post('http://localhost:3000/add/personaje', personaje)

    return res.then((response) => response.data)
}