import {
  FETCH_BYOC_FAILURE,
  FETCH_BYOC_REQUEST,
  FETCH_BYOC_SUCCESS,
} from "../actions/byocActions";

const initialState = {
  loading: false,
  byoc: [],
  error: null,
};

const byocReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BYOC_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BYOC_SUCCESS:
      return {
        ...state,
        loading: false,
        byoc: action.payload,
      };
    case FETCH_BYOC_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default byocReducer;
