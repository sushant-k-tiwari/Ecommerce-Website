import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchJbrands } from "../features/actions/jbrandsActions";

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
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2.1,
  },
};

const JustLaunchedBrands = () => {
  const dispatch = useDispatch();

  const { jbrands } = useSelector((state) => state.jbrands);

  useEffect(() => {
    dispatch(fetchJbrands());
  }, [dispatch]);

  const [isCenterMode, setIsCenterMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCenterMode(window.innerWidth > 768); // Set breakpoint according to your needs
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // if (error) {
  //   console.log(error);
  // }

  return (
    <>
      <div className="top-brand-deals container">
        <h3 className="justlaunched">Just Launched Brands</h3>

        <div className="container needToBeSetMobile youmaylikeboxshadow">
          <Carousel
            responsive={responsive}
            arrows={isCenterMode}
            centerMode={isCenterMode}
            infinite
            dotListClass="custom-dot-list-style"
          >
            {jbrands.map((e) => (
              <div key={e.id}>
                <Link to={`${e.link}`}>
                  <img
                    src={e.thumbnail?.original_url}
                    width="95%"
                    alt={e.name}
                  />
                </Link>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default JustLaunchedBrands;
