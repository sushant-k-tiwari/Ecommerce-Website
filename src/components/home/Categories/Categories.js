import React, { useEffect, useCallback, useMemo } from "react";
import "./categories.css";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/actions/categoriesActions";
import { fetchPage } from "../../features/actions/pageActions";

const Categories = () => {
  const dispatch = useDispatch();

  // categories api
  const { categories } = useSelector((state) => state.categories);

  const fetchCategoriesData = useCallback(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    fetchCategoriesData();
  }, [fetchCategoriesData]);

  // page categories api
  const { page } = useSelector((state) => state.page);

  const fetchPageData = useCallback(() => {
    dispatch(fetchPage());
  }, [dispatch]);

  useEffect(() => {
    fetchPageData();
  }, [fetchPageData]);

  const filterCategories = useMemo(() => {
    return page.filter(
      (pageCategory) => pageCategory.show_with_category === "on"
    );
  }, [page]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
    },
  };

  return (
    <>
      <div className="categoriesMainDiv">
        <div className="container">
          <div className="my-auto categoriesDiv">
            {categories.map((e) => (
              <Link to={`/category/${e.slug}`} key={e.id}>
                {e.name}
              </Link>
            ))}
            {filterCategories.map((e) => (
              <Link to={`/page/${e.slug}`} key={e.id}>
                {e.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> */}

      {/* for mobile */}
      <div className="categoriesMobileDiv" style={{ marginTop: "1rem" }}>
        <div className="container">
          <Carousel
            responsive={responsive}
            arrows={false}
            swipeable={true}
            autoPlay
            centerMode
            infinite
            className="carouselResponsive"
          >
            {categories.map((e) => (
              <div className="my-auto" key={e.id}>
                <Link to={`/category/${e.slug}`} style={{ color: "#464646" }}>
                  <img src={e.image?.original_url} alt="" width="70%" />
                  <br />
                  <span style={{ fontSize: "12px" }}>{e.name.slice(0, 9)}</span>
                </Link>
              </div>
            ))}
            {filterCategories.map((e) => (
              <div className="my-auto" key={e.id}>
                <Link to={`/page/${e.slug}`} style={{ color: "#464646" }}>
                  <img src={e.icon?.original_url} alt="" width="70%" />
                  <br />
                  <span style={{ fontSize: "12px" }}>{e.name.slice(0, 9)}</span>
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Categories;
