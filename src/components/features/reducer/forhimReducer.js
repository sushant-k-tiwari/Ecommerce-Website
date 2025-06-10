import { FETCH_FORHIM_FAILURE,FETCH_FORHIM_SUCCESS,FETCH_FORHIM_REQUEST } from "../actions/forhimActions";

const initialState = {
    loading: false,
    forhim: [],
    error: null,
  };

  const forhimReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORHIM_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_FORHIM_SUCCESS:
        return {
          ...state,
          loading: false,
          forhim: action.payload,
        };
      case FETCH_FORHIM_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default forhimReducer;