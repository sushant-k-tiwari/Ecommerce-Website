import { FETCH_HOTDEAL_FAILURE,FETCH_HOTDEAL_SUCCESS,FETCH_HOTDEAL_REQUEST } from "../actions/hotdealActions";

const initialState = {
    loading: false,
    hotdeal: [],
    error: null,
  };

  const hotdealReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_HOTDEAL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_HOTDEAL_SUCCESS:
        return {
          ...state,
          loading: false,
          hotdeal: action.payload,
        };
      case FETCH_HOTDEAL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default hotdealReducer;