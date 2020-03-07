import {
  FETCH_GAMES_ERROR,
  FETCH_GAMES_LOADING,
  FETCH_GAMES_SUCCESS
} from "../types";

const initialState = {
  data: [],
  loading: false,
  error: ""
};

export default function rootReducer(state = initialState, action) {
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
