import {
  FETCH_PAGE_FAILURE,
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
} from "../actions/pageActions";

const initialState = {
    loading: false,
    page: [],
    error: null,
  };

const pageReducer =  (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PAGE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          page: action.payload,
        };
      case FETCH_PAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default pageReducer;
  