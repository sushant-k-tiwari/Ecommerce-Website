import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchToppicks } from "../features/actions/toppicksActions";

const TopTrendingCombos = () => {
  const dispatch = useDispatch();

  const { toppicks } = useSelector((state) => state.toppicks);
  useEffect(() => {
    dispatch(fetchToppicks());
  }, [dispatch]);

  // Carousel Responsive

  const responsive = {
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
      items: 1,

      slidesToSlide: 1,
    },
  };

  return (
    <>
      <section className="desktop">
        <div className="top-trending container">
          <div className="top-trending-head" style={{ marginTop: "67px" }}>
            <h3>Top Picks For You...</h3>
          </div>
        </div>
        <div className="container" style={{ marginTop: "28px" }}>
          <div className="row">
            {Array.isArray(toppicks) &&
              toppicks.map((e) => (
                <div
                  className="col-md-6"
                  style={{ marginTop: "20px" }}
                  key={e.id}
                >
                  <div className="top-picks-img">
                    <Link to={`${e.link}`}>
                      <img
                        src={e.thumbnail?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* mobile */}
      <div className="mobile">
        <div className="top-trending container">
          <div className="top-trending-head" style={{ marginBottom: "2rem" }}>
            <h3>Top Picks For You...</h3>
          </div>
        </div>
        <div className="topPicksCarousel container">
          <Carousel
            showDots={false}
            responsive={responsive}
            infinite={true}
            // autoPlay={true}
            arrows={false}
            centerMode
          >
            {Array.isArray(toppicks) &&
              toppicks.map((e) => (
                <div key={e.id} style={{ width: "100%" }}>
                  <div className="top-picks-img my-3">
                    <Link to={`${e.link}`}>
                      <img
                        src={e.thumbnail?.original_url}
                        width="95%"
                        alt={e.name}
                      />
                    </Link>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default TopTrendingCombos;
