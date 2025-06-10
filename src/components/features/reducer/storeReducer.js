import {
  FETCH_STORE_FAILURE,
  FETCH_STORE_REQUEST,
  FETCH_STORE_SUCCESS,
} from "../actions/storeAction";


const initialState = {
    loading: false,
    store: [],
    error: null,
  };

const storeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_STORE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_STORE_SUCCESS:
        return {
          ...state,
          loading: false,
          store: action.payload,
        };
      case FETCH_STORE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default storeReducer;
  