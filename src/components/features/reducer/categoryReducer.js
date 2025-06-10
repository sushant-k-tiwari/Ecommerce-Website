import {
  FETCH_CATEGORY_FAILURE,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  SORT_HIGH_TO_LOW,
  SORT_LOW_TO_HIGH,
} from "../actions/categoryActions";

const initialState = {
  loading: false,
  banner: null,
  combo: null,
  product: null,
  error: null,
  totalPages: 0,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        banner: action.payload.data.category,
        combo: action.payload.data.combos.data,
        product: action.payload.data.products.data,
        totalPages:action.payload.data.products.last_page
      };

    case SORT_HIGH_TO_LOW:
      return {
        ...state,
        combo: state.combo.slice().sort((a, b) => b.selling_price - a.selling_price),
        product: state.product.slice().sort((a, b) => b.selling_price - a.selling_price),
      };

    case SORT_LOW_TO_HIGH:
      return {
        ...state,
        combo: state.combo.slice().sort((a, b) => a.selling_price - b.selling_price),
        product: state.product.slice().sort((a, b) => a.selling_price - b.selling_price),
      };

    case FETCH_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
