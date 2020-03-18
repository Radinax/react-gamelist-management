import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from "redux-saga"
import { takeLatest, call, put } from "redux-saga/effects"
import { addGame, deleteGame, editGame, fetchGames } from '../api'

// Types as constants
const FETCH_GAMES_REQUESTED = "FETCH_GAMES_REQUESTED"
const FETCH_GAMES_SUCCESS = "FETCH_GAMES_SUCCESS"
const FETCH_GAMES_ERROR = "FETCH_GAMES_ERROR"

const CREATE_GAME_REQUESTED = "CREATE_GAMES_REQUESTED"
const CREATE_GAME_ERROR = "CREATE_GAMES_ERROR"

const EDIT_GAME_REQUESTED = "EDIT_GAMES_REQUESTED"
const EDIT_GAME_ERROR = "EDIT_GAMES_ERROR"

const DELETE_GAME_REQUESTED = "DELETE_GAMES_REQUESTED"
const DELETE_GAME_ERROR = "DELETE_GAMES_ERROR"

// Actions
export const fetchingGames = () => ({ type: FETCH_GAMES_REQUESTED })
export const fetchingGamesSuccess = games => ({ type: FETCH_GAMES_SUCCESS, data: games })
export const fetchingGamesError = error => ({ type: FETCH_GAMES_ERROR, error })

export const createGameRequest = (payload) => ({ type: CREATE_GAME_REQUESTED, payload })
export const createGameError = () => ({ type: CREATE_GAME_ERROR })

export const editGameRequest = (payload) => ({ type: EDIT_GAME_REQUESTED, payload })
export const editGameError = () => ({ type: EDIT_GAME_ERROR })

export const deleteGameRequest = (payload) => ({ type:DELETE_GAME_REQUESTED, payload })
export const deleteGameError = () => ({ type:DELETE_GAME_ERROR })

// Watcher Saga: Generator function watching for every action...
// ...in response to that action, the watcher will call a worker saga
export default function* watcherSaga() {
  yield takeLatest(FETCH_GAMES_REQUESTED, fetchGamesSaga)
  yield takeLatest(CREATE_GAME_REQUESTED, createGameSaga)
  yield takeLatest(EDIT_GAME_REQUESTED, editGameSaga)
  yield takeLatest(DELETE_GAME_REQUESTED, deleteGameSaga)
}

// Worker Sagas
// Call an API that put the Action to its corresponding channel
function* fetchGamesSaga() {
  try {
    const payload = yield call(fetchGames)
    yield put(fetchingGamesSuccess(payload))
  } catch (error) {
    yield put(fetchingGamesError(error))
  }
}

function* createGameSaga({ payload }) {
  try {
    yield call(addGame(payload))
  } catch (error) {
    yield put(createGameError(error))
  }
}

function* editGameSaga({ payload }) {
  try {
    yield call(editGame(payload))
  } catch (error) {
    yield put(editGameError(error))
  }
}

function* deleteGameSaga({ payload }) {
  try {
    yield call(deleteGame(payload))
  } catch (error) {
    yield put(deleteGameError(error))
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
    case FETCH_GAMES_REQUESTED:
    case DELETE_GAME_REQUESTED:
    case CREATE_GAME_REQUESTED:
    case EDIT_GAME_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        data: action.data,
        loading: false
      };
    case FETCH_GAMES_ERROR:
    case DELETE_GAME_ERROR:
    case CREATE_GAME_ERROR:
    case EDIT_GAME_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default: return state
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
