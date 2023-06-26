import axios from 'axios'

export const getPersonajesEpisode = (episode) => {
    const res = axios.get(`http://localhost:3000/personajes/${episode}`)

    return res.then((response) => response.data)
}