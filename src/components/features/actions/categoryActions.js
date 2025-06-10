import axios from "axios";

export const FETCH_CATEGORY_REQUEST = "FETCH_CATEGORY_REQUEST";
export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const FETCH_CATEGORY_FAILURE = "FETCH_CATEGORY_FAILURE";
export const SORT_HIGH_TO_LOW = "SORT_HIGH_TO_LOW";
export const SORT_LOW_TO_HIGH = "SORT_LOW_TO_HIGH";



export const fetchCategoryRequest = () => ({
  type: FETCH_CATEGORY_REQUEST,
});

export const fetchCategorySuccess = (data) => ({
  type: FETCH_CATEGORY_SUCCESS,
  // payload: category,
  payload: data,

});


export const fetchCategoryFailure = (error) => ({
  type: FETCH_CATEGORY_FAILURE,
  payload: error,
});

export const sortHighToLow = () => ({
  type: SORT_HIGH_TO_LOW,
});

export const sortLowToHigh = () => ({
  type: SORT_LOW_TO_HIGH,
});



export const fetchCategory = (slug,pageNumber) => {
  return async (dispatch) => {
    dispatch(fetchCategoryRequest());
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
          `${process.env.REACT_APP_BASE_URL}/category/${slug}?page=${pageNumber}`,
          options
        );
        dispatch(fetchCategorySuccess(response.data));
      
     
    
    } catch (error) {
      dispatch(fetchCategoryFailure(error.message));
    }
 
  };
};
