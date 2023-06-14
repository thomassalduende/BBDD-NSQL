import axios from 'axios'

export const addEpisode = (episode) => {
    const res = axios.post('http://localhost:3000/add/episode', episode)

    return res.then((response) => response.data)
}