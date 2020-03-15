import { createSlice, getDefaultMiddleware, configureStore } from '@reduxjs/toolkit'
import axios from 'axios'

// Actions
export const addGame = (payload) => () => axios.post('http://localhost:3000/games', { ...payload })
export const deleteGame = (payload) => () => axios.delete(`http://localhost:3000/games/${payload.id}`)
export const editGame = (payload) => () => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })
export const fetchGames = () => async dispatch => {
  dispatch(fetchingGames())
  try {
    const response = await axios.get('http://localhost:3000/games')
    dispatch(fetchingGamesSuccess(response))
  } catch (error) {
    dispatch(fetchingGamesError(error), error.message || 'ERROR')
  }
}

// Initial State
const initialState = {
  data: [],
  loading: false,
  error: ""
};

// Slice
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

// Destructuring the actions we're gonna use in the app
export const { fetchingGames, fetchingGamesSuccess, fetchingGamesError } = slice.actions

// Configuring our store which will be used in Provider to enable Global State
export const store = configureStore({
  reducer: slice.reducer,
  middleware: [...getDefaultMiddleware({
    serializableCheck: false,
  })]
})
