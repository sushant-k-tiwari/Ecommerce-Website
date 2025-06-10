import {
  FETCH_COMBODETAILS_FAILURE,
  FETCH_COMBODETAILS_REQUEST,
  FETCH_COMBODETAILS_SUCCESS,
} from "../actions/combodetailsActions";

const initialState = {
  loading: false,

  combos: [],
  comboproduct: null,
  error: null,
};

const combodetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMBODETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_COMBODETAILS_SUCCESS:
      return {
        ...state,
        loading: false,

        combos: action.payload.combo,
        comboproduct: action.payload.combo.gallery,
      };

    case FETCH_COMBODETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default combodetailsReducer;
