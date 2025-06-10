import {
  FETCH_YOUMAYLIKE_FAILURE,
  FETCH_YOUMAYLIKE_REQUEST,
  FETCH_YOUMAYLIKE_SUCCESS,
} from "../actions/youmaylikeActions";



const initialState = {
    loading: false,
    youmaylike: [],
    error: null,
  };


const youmaylikeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_YOUMAYLIKE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_YOUMAYLIKE_SUCCESS:
        return {
          ...state,
          loading: false,
          youmaylike: action.payload,
        };
      case FETCH_YOUMAYLIKE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export default youmaylikeReducer