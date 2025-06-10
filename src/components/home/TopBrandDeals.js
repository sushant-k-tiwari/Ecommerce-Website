import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCombodeal } from "../features/actions/combodealActions";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const TopBrandDeals = () => {
  const dispatch = useDispatch();
  const { combodeal } = useSelector((state) => state.combodeal);

  useEffect(() => {
    dispatch(fetchCombodeal());
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

  return (
    <div>
      <div className="top-brand-deals">
        <h3 className="text-center ">Top Combo Deals For You</h3>
        <div className="container">
          <Carousel
            responsive={responsive}
            arrows={false}
            infinite
            centerMode={isCenterMode}
          >
            {Array.isArray(combodeal) &&
              combodeal.map((e) => (
                <div key={e.id}>
                  <Link>
                    <img
                      src={e.thumbnail?.original_url}
                      width="80%"
                      alt={e.name}
                    />
                  </Link>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default TopBrandDeals;
