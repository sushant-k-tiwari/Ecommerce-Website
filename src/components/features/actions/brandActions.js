import axios from "axios";

export const FETCH_BRAND_REQUEST = "FETCH_BRAND_REQUEST";
export const FETCH_BRAND_SUCCESS = "FETCH_BRAND_SUCCESS";
export const FETCH_BRAND_FAILURE = "FETCH_BRAND_FAILURE";

export const fetchBrandRequest = () => ({
  type: FETCH_BRAND_REQUEST,
});

export const fetchBrandSuccess = (brand) => ({
  type: FETCH_BRAND_SUCCESS,
  payload: brand,
});

export const fetchBrandFailure = (error) => ({
  type: FETCH_BRAND_FAILURE,
  payload: error,
});

export const fetchBrand = () => {
  return async (dispatch) => {
    dispatch(fetchBrandRequest());
    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        "Cache-Control": "no-cache, no-store, must-revalidate",
        mode: "cors",
        credentials: "include",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/brands`,
        options
      );
      dispatch(fetchBrandSuccess(response.data));
    
    } catch (error) {
      dispatch(fetchBrandFailure(error.message));
    }
  };
};
