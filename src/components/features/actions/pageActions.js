import axios from "axios";

export const FETCH_PAGE_REQUEST = "FETCH_PAGE_REQUEST";
export const FETCH_PAGE_SUCCESS = "FETCH_PAGE_SUCCESS";
export const FETCH_PAGE_FAILURE = "FETCH_PAGE_FAILURE";

export const fetchPageRequest = () => ({
  type: FETCH_PAGE_REQUEST,
});

export const fetchPageSuccess = (byoc) => ({
  type: FETCH_PAGE_SUCCESS,
  payload: byoc,
});

export const fetchPageFailure = (error) => ({
  type: FETCH_PAGE_FAILURE,
  payload: error,
});

export const fetchPage = () => {
  return async (dispatch) => {
    dispatch(fetchPageRequest());
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
        `${process.env.REACT_APP_BASE_URL}/pages`,
        options
      );
      dispatch(fetchPageSuccess(response.data));
 
    } catch (error) {
      dispatch(fetchPageFailure(error.message));
    }
  };
};
