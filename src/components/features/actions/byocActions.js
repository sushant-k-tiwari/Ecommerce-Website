import axios from "axios";

export const FETCH_BYOC_REQUEST = "FETCH_BYOC_REQUEST";
export const FETCH_BYOC_SUCCESS = "FETCH_BYOC_SUCCESS";
export const FETCH_BYOC_FAILURE = "FETCH_BYOC_FAILURE";

export const fetchByocRequest = () => ({
  type: FETCH_BYOC_REQUEST,
});

export const fetchByocSuccess = (byoc) => ({
  type: FETCH_BYOC_SUCCESS,
  payload: byoc,
});

export const fetchByocFailure = (error) => ({
  type: FETCH_BYOC_FAILURE,
  payload: error,
});

export const fetchByoc = () => {
  return async (dispatch) => {
    dispatch(fetchByocRequest());
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
        `${process.env.REACT_APP_BASE_URL}/settings`,
        options
      );
      dispatch(fetchByocSuccess(response.data));
 
    } catch (error) {
      dispatch(fetchByocFailure(error.message));
    }
  };
};
