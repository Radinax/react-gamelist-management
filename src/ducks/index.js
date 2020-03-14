import { createSlice, getDefaultMiddleware, configureStore } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  data: [],
  loading: false,
  error: ""
};

const slice = createSlice({
  name: 'rootReducer',
  initialState,
  reducers: {
    fetchingGames: state => {
      state.loading = true
    },
    fetchingGamesSuccess: (state, { payload }) => {
      state.data = payload.data
      state.loading = false
      state.error = false
    },
    fetchingGamesError: (state, { payload }) => { 
      state.loading = false
      state.error = payload.error
    }
  }
})

export const { fetchingGames, fetchingGamesSuccess, fetchingGamesError } = slice.actions

export const sliceReducer = slice.reducer

export const fetchGames = () => dispatch => {
  dispatch(fetchingGames())
  axios.get('http://localhost:3000/games')
    .then(
      data => dispatch(fetchingGamesSuccess, data),
      error => dispatch(fetchingGamesError, error.message || 'ERROR')
    )
}

export const addGame = (payload) => () => axios.post('http://localhost:3000/games', { ...payload })

export const deleteGame = (payload) => () => axios.delete(`http://localhost:3000/games/${payload.id}`)

export const editGame = (payload) => () => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })

export const store = configureStore({
  reducer: sliceReducer,
  middleware: [...getDefaultMiddleware()]
})

