import { 
  createSlice,
  getDefaultMiddleware,
  configureStore,
  createAsyncThunk 
} from '@reduxjs/toolkit'
import axios from 'axios'

// API
export const addGame = (payload) => () => axios.post('http://localhost:3000/games', { ...payload })
export const deleteGame = (payload) => () => axios.delete(`http://localhost:3000/games/${payload.id}`)
export const editGame = (payload) => () => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })
export const fetchGames = createAsyncThunk(
  'rootReducer/fetchingGames',
  async () => {
    const response = await axios.get('http://localhost:3000/games')
    return response.data
  }
)

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
  reducers: {},
  extraReducers: {
    [fetchGames.pending]: (state) => {
      state.loading = true
    },
    [fetchGames.fulfilled]: (state, action) => {
      state.data = action.payload
      state.loading = false
      state.error = false
    },
    [fetchGames.rejected]: (state, action) => {
      state.loading = false
      state.error = action.error
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
