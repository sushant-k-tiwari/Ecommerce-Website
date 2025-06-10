import {
  FETCH_JBRANDS_FAILURE,
  FETCH_JBRANDS_REQUEST,
  FETCH_JBRANDS_SUCCESS,
} from "../actions/jbrandsActions";


const initialState = {
    loading: false,
    jbrands: [],
    error: null,
  };


const jbrandsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_JBRANDS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_JBRANDS_SUCCESS:
        return {
          ...state,
          loading: false,
          jbrands: action.payload,
        };
      case FETCH_JBRANDS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

export default jbrandsReducer;