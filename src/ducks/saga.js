import axios from "axios"
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from "redux-saga"
import { takeLatest, call, put } from "redux-saga/effects";

// Types as constants
const FETCH_GAMES_LOADING = "FETCH_GAMES_LOADING"
const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS"
const FETCH_GAMES_ERROR = "FETCH_GAMES_ERROR"

export const CREATE_GAME_LOADING = "CREATE_GAMES_LOADING"
const CREATE_GAME_SUCCESS = "CREATE_GAMES_SUCCESS"
const CREATE_GAME_ERROR = "CREATE_GAMES_ERROR"

export const EDIT_GAME_LOADING = "EDIT_GAMES_LOADING"
const EDIT_GAME_SUCCESS = "EDIT_GAMES_SUCCESS"
const EDIT_GAME_ERROR = "EDIT_GAMES_ERROR"

export const DELETE_GAME_LOADING = "DELETE_GAMES_LOADING"
const DELETE_GAME_SUCCESS = "DELETE_GAMES_SUCCESS"
const DELETE_GAME_ERROR = "DELETE_GAMES_ERROR"

// API
export const addGame = (payload) => axios.post('http://localhost:3000/games', { ...payload })
export const deleteGame = (payload) => axios.delete(`http://localhost:3000/games/${payload.id}`)
export const editGame = (payload) => axios.put(`http://localhost:3000/games/${payload.id}`, { ...payload })
export const fetchGames = () => axios.get('http://localhost:3000/games')

// Actions
export const fetchingGames = () => ({ type: FETCH_GAMES_LOADING })
export const fetchingGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, data: games })
export const fetchingGamesError = error => ({ type: FETCH_GAMES_ERROR, error })

export const createGameRequest = (payload) => ({ type: CREATE_GAME_LOADING, payload })
export const createGameSuccess = () => ({ type: CREATE_GAME_SUCCESS })
export const createGameError = () => ({ type: CREATE_GAME_ERROR })

export const editGameRequest = (payload) => ({ type: EDIT_GAME_LOADING, payload })
export const editGameSuccess = () => ({ type: EDIT_GAME_SUCCESS })
export const editGameError = () => ({ type: EDIT_GAME_ERROR })

export const deleteGameRequest = (payload) => ({ type:DELETE_GAME_LOADING, payload })
export const deleteGameSuccess = () => ({ type:DELETE_GAME_SUCCESS })
export const deleteGameError = () => ({ type:DELETE_GAME_ERROR })

// Sagas
export default function* watcherSaga() {
  yield takeLatest(FETCH_GAMES_LOADING, fetchGamesSaga)
  yield takeLatest(CREATE_GAME_LOADING, createGameSaga)
  yield takeLatest(EDIT_GAME_LOADING, editGameSaga)
  yield takeLatest(DELETE_GAME_LOADING, deleteGameSaga)
}

function* fetchGamesSaga() {
  try {
    const payload = yield call(fetchGames);
    yield put({ type: FETCH_GAMES_SUCCESS, data: payload });
  } catch (error) {
    yield put({ type: FETCH_GAMES_ERROR, error });
  }
}

function* createGameSaga({ payload }) {
  try {
    const data = yield call(addGame(payload))
    yield put({ type: CREATE_GAME_LOADING, payload: data });
  } catch (error) {
    yield put({ type: CREATE_GAME_ERROR, error });
  }
}

function* editGameSaga({ payload }) {
  try {
    const data = yield call(editGame(payload))
    yield put({ type: EDIT_GAME_LOADING, payload: data });
  } catch (error) {
    yield put({ type: EDIT_GAME_ERROR, error });
  }
}

function* deleteGameSaga({ payload }) {
  try {
    const data = yield call(deleteGame(payload))
    yield put({ type: DELETE_GAME_LOADING, payload: data });
  } catch (error) {
    yield put({ type: DELETE_GAME_ERROR, error });
  }
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

// Configuring our store which will be used in Provider to enable Global State
const sagaMiddleware = createSagaMiddleware()
export const configureStore = (initialState) => {
  const middleware = [sagaMiddleware]
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middleware)))
  sagaMiddleware.run(watcherSaga)
  return store
 }
