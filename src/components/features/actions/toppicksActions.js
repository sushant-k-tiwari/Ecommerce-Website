import axios from "axios";

export const FETCH_TOPPICKS_REQUEST = "FETCH_TOPPICKS_REQUEST";
export const FETCH_TOPPICKS_SUCCESS = "FETCH_TOPPICKS_SUCCESS";
export const FETCH_TOPPICKS_FAILURE = "FETCH_TOPPICKS_FAILURE";

export const fetchToppicksRequest = () => ({
  type: FETCH_TOPPICKS_REQUEST,
});

export const fetchToppicksSuccess = (toppicks) => ({
  type: FETCH_TOPPICKS_SUCCESS,
  payload: toppicks,
});

export const fetchToppicksFailure = (error) => ({
  type: FETCH_TOPPICKS_FAILURE,
  payload: error,
});

export const fetchToppicks = () => {
  return async (dispatch) => {
    dispatch(fetchToppicksRequest());
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
        `${process.env.REACT_APP_BASE_URL}/topPicks`,
        options
      );
      dispatch(fetchToppicksSuccess(response.data));
      
    } catch (error) {
      dispatch(fetchToppicksFailure(error.message));
    }
  };
};
