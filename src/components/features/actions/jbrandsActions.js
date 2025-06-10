import axios from "axios";

export const FETCH_JBRANDS_REQUEST = "FETCH_JBRANDS_REQUEST";
export const FETCH_JBRANDS_SUCCESS = "FETCH_JBRANDS_SUCCESS";
export const FETCH_JBRANDS_FAILURE = "FETCH_JBRANDS_FAILURE";

export const fetchJbrandsRequest = () => ({
  type: FETCH_JBRANDS_REQUEST,
});

export const fetchJbrandsSuccess = (jbrands) => ({
  type: FETCH_JBRANDS_SUCCESS,
  payload: jbrands,
});

export const fetchJbrandsFailure = (error) => ({
  type: FETCH_JBRANDS_FAILURE,
  payload: error,
});

export const fetchJbrands = () => {
  return async (dispatch) => {
    dispatch(fetchJbrandsRequest());
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
        `${process.env.REACT_APP_BASE_URL}/productDeals`,
        options
      );
      dispatch(fetchJbrandsSuccess(response.data));
      
    } catch (error) {
      dispatch(fetchJbrandsFailure(error.message));
    }
  };
};
