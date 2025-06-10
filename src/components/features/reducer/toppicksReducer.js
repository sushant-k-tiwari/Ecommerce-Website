import {
  FETCH_TOPPICKS_FAILURE,
  FETCH_TOPPICKS_REQUEST,
  FETCH_TOPPICKS_SUCCESS,
} from "../actions/toppicksActions";

const initialState = {
  loading: false,
  toppicks: [],
  error: null,
};

const toppicksReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOPPICKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOPPICKS_SUCCESS:
      return {
        ...state,
        loading: false,
        toppicks: action.payload,
      };
    case FETCH_TOPPICKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default toppicksReducer;
