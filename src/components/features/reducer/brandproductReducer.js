import {
  FETCH_BRANDPRODUCT_FAILURE,
  FETCH_BRANDPRODUCT_REQUEST,
  FETCH_BRANDPRODUCT_SUCCESS,
  SORT_BRANDPRODUCT,
  FILTER_BRANDPRODUCT,
  UPDATE_BRANDPRODUCT,  
} from "../actions/brandproductActions";

const initialState = {
  loading: false,
  brandproduct: [],
  brandname: [],
  error: null,
 
  totalPages: 0,
};

const brandproductReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANDPRODUCT_REQUEST:
      return {
        ...state,   
        loading: true,
        error: null,
      };
    case FETCH_BRANDPRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        brandproduct: action.payload.products.data,
        brandname: action.payload.brand,
        totalPages:action.payload.products.last_page
      };
    case FETCH_BRANDPRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case SORT_BRANDPRODUCT:
      const { brandproduct } = state;
      const sortOrder = action.payload;

      const sortedBrandproduct = [...brandproduct]; // Clone the brandproduct array

      sortedBrandproduct.sort((a, b) => {
        if (sortOrder === "highToLow") {
          return b.selling_price - a.selling_price;
        } else if (sortOrder === "lowToHigh") {
          return a.selling_price - b.selling_price;
        }
        return 0;
      });

      return {
        ...state,
        brandproduct: sortedBrandproduct,
      };
      case FILTER_BRANDPRODUCT:
        const { minPrice, maxPrice } = action.payload;
  
        const filteredBrandproduct = state.brandproduct.filter((product) => {
          const price = product.selling_price;
          return price >= minPrice && price <= maxPrice;
        });
  
        return {
          ...state,
          brandproduct: filteredBrandproduct,
        };
        case UPDATE_BRANDPRODUCT:
          return {
            ...state,
            brandproduct: action.payload,
          };
    default:
      return state;
  }
};

export default brandproductReducer;
