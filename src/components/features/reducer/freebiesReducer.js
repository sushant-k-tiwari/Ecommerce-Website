import {
  FETCH_FREEBIES_FAILURE,
  FETCH_FREEBIES_REQUEST,
  FETCH_FREEBIES_SUCCESS,
} from "../actions/freebiesActions";

const initialState = {
    loading: false,
    freeebies: [],
    error: null,
  };

const freebiesReducer =  (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FREEBIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_FREEBIES_SUCCESS:
        return {
          ...state,
          loading: false,
          freeebies: action.payload,
        };
      case FETCH_FREEBIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default freebiesReducer;