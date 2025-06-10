import axios from "axios";

export const FETCH_YOUMAYLIKE_REQUEST = "FETCH_YOUMAYLIKE_REQUEST";
export const FETCH_YOUMAYLIKE_SUCCESS = "FETCH_YOUMAYLIKE_SUCCESS";
export const FETCH_YOUMAYLIKE_FAILURE = "FETCH_YOUMAYLIKE_FAILURE";

export const fetchYoumaylikeRequest = () => ({
  type: FETCH_YOUMAYLIKE_REQUEST,
});

export const fetchYoumaylikeSuccess = (youmaylike) => ({
  type: FETCH_YOUMAYLIKE_SUCCESS,
  payload: youmaylike,
});

export const fetchYoumaylikeFailure = (error) => ({
  type: FETCH_YOUMAYLIKE_FAILURE,
  payload: error,
});

export const fetchYoumaylike = () => {
  return async (dispatch) => {
    dispatch(fetchYoumaylikeRequest());
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
        `${process.env.REACT_APP_BASE_URL}/combos`,
        options
      );
      dispatch(fetchYoumaylikeSuccess(response.data.data));
    
    } catch (error) {
      dispatch(fetchYoumaylikeFailure(error.message));
    }
  };
};
