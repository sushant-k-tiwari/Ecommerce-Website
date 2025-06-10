import {
  FETCH_COMBODEAL_FAILURE,
  FETCH_COMBODEAL_REQUEST,
  FETCH_COMBODEAL_SUCCESS,
} from "../actions/combodealActions";


const initialState = {
    loading: false,
    combodeal: [],
    error: null,
  };

const combodealReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COMBODEAL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_COMBODEAL_SUCCESS:
        return {
          ...state,
          loading: false,
          combodeal: action.payload,
        };
      case FETCH_COMBODEAL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default combodealReducer;
  