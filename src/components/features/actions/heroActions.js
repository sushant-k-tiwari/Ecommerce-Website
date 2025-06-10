import axios from "axios";

export const FETCH_HERO_REQUEST = "FETCH_HERO_REQUEST";
export const FETCH_HERO_SUCCESS = "FETCH_HERO_SUCCESS";
export const FETCH_HERO_FAILURE = "FETCH_HERO_FAILURE";

export const fetchHeroRequest = () => ({
  type: FETCH_HERO_REQUEST,
});

export const fetchHeroSuccess = (hero) => ({
  type: FETCH_HERO_SUCCESS,
  payload: hero,
});

export const fetchHeroFailure = (error) => ({
  type: FETCH_HERO_FAILURE,
  payload: error,
});

export const fetchHero = () => {
  return async (dispatch) => {
    dispatch(fetchHeroRequest());
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
        `${process.env.REACT_APP_BASE_URL}/mobile-banners`,
        options
      );
      dispatch(fetchHeroSuccess(response.data));
    
    } catch (error) {
      dispatch(fetchHeroFailure(error.message));
    }
  };
};
