import axios from "axios";

export const FETCH_HOTDEAL_REQUEST = "FETCH_HOTDEAL_REQUEST";
export const FETCH_HOTDEAL_SUCCESS = "FETCH_HOTDEAL_SUCCESS";
export const FETCH_HOTDEAL_FAILURE = "FETCH_HOTDEAL_FAILURE";

export const fetchhotdealRequest = () => ({
  type: FETCH_HOTDEAL_REQUEST,
});

export const fetchhotdealSuccess = (toppicks) => ({
  type: FETCH_HOTDEAL_SUCCESS,
  payload: toppicks,
});

export const fetchhotdealFailure = (error) => ({
  type: FETCH_HOTDEAL_FAILURE,
  payload: error,
});

export const fetchhotdeal = () => {
  return async (dispatch) => {
    dispatch(fetchhotdealRequest());
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
        `${process.env.REACT_APP_BASE_URL}/superFlashDeals`,
        options
      );
      dispatch(fetchhotdealSuccess(response.data));
      
    } catch (error) {
      dispatch(fetchhotdealFailure(error.message));
    }
  };
};
