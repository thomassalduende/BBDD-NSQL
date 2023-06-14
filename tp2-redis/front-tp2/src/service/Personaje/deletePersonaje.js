import axios from 'axios'

export const deletePersonaje = (personaje) => {
    const res = axios.delete(`http://localhost:3000/delete/personaje`,personaje)

    return res.then((response) => response.data)
}