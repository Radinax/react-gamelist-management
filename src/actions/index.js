import { 
  FETCH_GAMES_LOADING,
  FETCH_GAMES_SUCCESS,
  FETCH_GAMES_ERROR,
} from "../types"
import axios from "axios"

export const addGame = (payload) => () => axios.post('http://localhost:3000/games', { ...payload })

export const deleteGame = (payload) => () => axios.delete(`http://localhost:3000/games/${payload.id}`)

export const editGame = (payload) => () => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })

export const fetchGames =() => dispatch => {
  dispatch({ type: FETCH_GAMES_LOADING })
  axios.get('http://localhost:3000/games')
    .then(
      data => dispatch({ type: FETCH_GAMES_SUCCESS, data }),
      error => dispatch({ type: FETCH_GAMES_ERROR, error: error.message || 'ERROR' })
    )
};
