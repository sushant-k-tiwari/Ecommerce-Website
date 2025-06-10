import axios from "axios";

export const FETCH_FORHIM_REQUEST = "FETCH_FORHIM_REQUEST";
export const FETCH_FORHIM_SUCCESS = "FETCH_FORHIM_SUCCESS";
export const FETCH_FORHIM_FAILURE = "FETCH_FORHIM_FAILURE";

export const fetchForhimRequest = () => ({
  type: FETCH_FORHIM_REQUEST,
});

export const fetchForhimSuccess = (toppicks) => ({
  type: FETCH_FORHIM_SUCCESS,
  payload: toppicks,
});

export const fetchForhimFailure = (error) => ({
  type: FETCH_FORHIM_FAILURE,
  payload: error,
});

export const fetchForhim = () => {
  return async (dispatch) => {
    dispatch(fetchForhimRequest());
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
        `${process.env.REACT_APP_BASE_URL}/for-him`,
        options
      );
      dispatch(fetchForhimSuccess(response.data));
      
    } catch (error) {
      dispatch(fetchForhimFailure(error.message));
    }
  };
};
