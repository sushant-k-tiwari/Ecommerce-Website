import axios from "axios";

export const FETCH_STORE_REQUEST = "FETCH_STORE_REQUEST";
export const FETCH_STORE_SUCCESS = "FETCH_STORE_SUCCESS";
export const FETCH_STORE_FAILURE = "FETCH_STORE_FAILURE";

export const fetchStoreRequest = () => ({
  type: FETCH_STORE_REQUEST,
});

export const fetchStoreSuccess = (store) => ({
  type: FETCH_STORE_SUCCESS,
  payload: store,
});

export const fetchStoreFailure = (error) => ({
  type: FETCH_STORE_FAILURE,
  payload: error,
});

export const fetchStore = () => {
  return async (dispatch) => {
    dispatch(fetchStoreRequest());
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
        `${process.env.REACT_APP_BASE_URL}/stores`,
        options
      );
      dispatch(fetchStoreSuccess(response.data));
 
    } catch (error) {
      dispatch(fetchStoreFailure(error.message));
    }
  };
};
