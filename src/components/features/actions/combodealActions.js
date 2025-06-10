import axios from "axios";

export const FETCH_COMBODEAL_REQUEST = "FETCH_COMBODEAL_REQUEST";
export const FETCH_COMBODEAL_SUCCESS = "FETCH_COMBODEAL_SUCCESS";
export const FETCH_COMBODEAL_FAILURE = "FETCH_COMBODEAL_FAILURE";

export const fetchCombodealRequest = () => ({
  type: FETCH_COMBODEAL_REQUEST,
});

export const fetchCombodealSuccess = (combodeal) => ({
  type: FETCH_COMBODEAL_SUCCESS,
  payload: combodeal,
});

export const fetchCombodealFailure = (error) => ({
  type: FETCH_COMBODEAL_FAILURE,
  payload: error,
});

export const fetchCombodeal = () => {
  return async (dispatch) => {
    dispatch(fetchCombodealRequest());
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
        `${process.env.REACT_APP_BASE_URL}/comboDeals`,
        options
      );
      dispatch(fetchCombodealSuccess(response.data));
 
    } catch (error) {
      dispatch(fetchCombodealFailure(error.message));
    }
  };
};
