import {
  FETCH_FORHER_FAILURE,
  FETCH_FORHER_REQUEST,
  FETCH_FORHER_SUCCESS,
} from "../actions/forherActions";

const initialState = {
  loading: false,
  forher: [],
  error: null,
};


const forherReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FORHER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_FORHER_SUCCESS:
        return {
          ...state,
          loading: false,
          forher: action.payload,
        };
      case FETCH_FORHER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default forherReducer;