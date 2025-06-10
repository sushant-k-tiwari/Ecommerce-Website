import axios from "axios";

export const FETCH_COMBODETAILS_REQUEST = "FETCH_COMBODETAILS_REQUEST";
export const FETCH_COMBODETAILS_SUCCESS = "FETCH_COMBODETAILS_SUCCESS";
export const FETCH_COMBODETAILS_FAILURE = "FETCH_COMBODETAILS_FAILURE";

export const fetchCombodetailsRequest = () => ({
  type: FETCH_COMBODETAILS_REQUEST,
});

export const fetchCombodetailsSuccess = (combodetails) => ({
  type: FETCH_COMBODETAILS_SUCCESS,
  payload: combodetails,
});

export const fetchCombodetailsFailure = (error) => ({
  type: FETCH_COMBODETAILS_FAILURE,
  payload: error,
});

export const fetchCombodetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchCombodetailsRequest());
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
        `${process.env.REACT_APP_BASE_URL}/combo/${id}`,
        options
      );
      dispatch(fetchCombodetailsSuccess(response.data));
      console.log(response.data);
 
    } catch (error) {
      dispatch(fetchCombodetailsFailure(error.message));
    }
  };
};
