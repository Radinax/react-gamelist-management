import axios from "axios"

export const addGame = (payload) => axios.post('http://localhost:3000/games', { ...payload })
export const deleteGame = (payload) => axios.delete(`http://localhost:3000/games/${payload.id}`)
export const editGame = (payload) => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })
export const fetchGames = () => axios.get('http://localhost:3000/games')