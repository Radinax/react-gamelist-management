import axios from "axios"
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'react-redux'

// Types as constants
const FETCH_GAMES_LOADING = "FETCH_GAMES_LOADING"
const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS"
const FETCH_GAMES_ERROR = "FETCH_GAMES_ERROR"

// Actions
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
}

// Intial State
const initialState = {
  data: [],
  loading: false,
  error: ""
};

// Root Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GAMES_LOADING: {
      return {
        ...state,
        loading: true
      };
    }
    case FETCH_GAMES_SUCCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      };
    }
    case FETCH_GAMES_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}

export const configureStore = (initialState) => {
  const middleware = [thunk]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
  return store
 }
