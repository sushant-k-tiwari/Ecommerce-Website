import axios from "axios";

export const FETCH_FREEBIES_REQUEST = "FETCH_FREEBIES_REQUEST";
export const FETCH_FREEBIES_SUCCESS = "FETCH_FREEBIES_SUCCESS";
export const FETCH_FREEBIES_FAILURE = "FETCH_FREEBIES_FAILURE";

export const fetchFreebiesRequest = () => ({
  type: FETCH_FREEBIES_REQUEST,
});

export const fetchFreebiesSuccess = (freeebies) => ({
  type: FETCH_FREEBIES_SUCCESS,
  payload: freeebies,
});

export const fetchFreebiesFailure = (error) => ({
  type: FETCH_FREEBIES_FAILURE,
  payload: error,
});

export const fetchFreebies = () => {
  return async (dispatch) => {
    dispatch(fetchFreebiesRequest());
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
        `${process.env.REACT_APP_BASE_URL}/freebies`,
        options
      );
      dispatch(fetchFreebiesSuccess(response.data.products));
      console.log(response.data.products);
 
    } catch (error) {
      dispatch(fetchFreebiesFailure(error.message));
    }
  };
};
