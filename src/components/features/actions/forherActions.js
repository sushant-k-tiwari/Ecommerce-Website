import axios from "axios";

export const FETCH_FORHER_REQUEST = "FETCH_FORHER_REQUEST";
export const FETCH_FORHER_SUCCESS = "FETCH_FORHER_SUCCESS";
export const FETCH_FORHER_FAILURE = "FETCH_FORHER_FAILURE";

export const fetchForherRequest = () => ({
  type: FETCH_FORHER_REQUEST,
});

export const fetchForherSuccess = (toppicks) => ({
  type: FETCH_FORHER_SUCCESS,
  payload: toppicks,
});

export const fetchForherFailure = (error) => ({
  type: FETCH_FORHER_FAILURE,
  payload: error,
});

export const fetchForher = () => {
  return async (dispatch) => {
    dispatch(fetchForherRequest());
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
        `${process.env.REACT_APP_BASE_URL}/for-her`,
        options
      );
      dispatch(fetchForherSuccess(response.data));
      
    } catch (error) {
      dispatch(fetchForherFailure(error.message));
    }
  };
};
