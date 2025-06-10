import {
  FETCH_HERO_FAILURE,
  FETCH_HERO_REQUEST,
  FETCH_HERO_SUCCESS,
} from "../actions/heroActions";


const initialState = {
    loading: false,
    hero: [],
    error: null,
  };


const heroReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_HERO_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_HERO_SUCCESS:
        return {
          ...state,
          loading: false,
          hero: action.payload,
        };
      case FETCH_HERO_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  
  export default heroReducer