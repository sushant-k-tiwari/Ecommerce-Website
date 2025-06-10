import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Link } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchHero } from "../features/actions/heroActions";
const Hero = () => {
  const dispatch = useDispatch();
  const { hero } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHero());
  }, [dispatch]);

  // Responsive

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <div className="desktop heroCarousel">
        <Carousel
          showDots={false}
          responsive={responsive}
          infinite={true}
          autoPlay
        >
          {Array.isArray(hero) &&
            hero.map((e) => (
              <div key={e.banner?.id} style={{ width: "100%" }}>
                <div>
                  <Link to={`${e.link}`}>
                    <img
                      src={e.banner?.original_url}
                      width="100%"            
                      alt={e.name}
                    />
                  </Link>
                </div>
              </div>
            ))}
        </Carousel>
      </div>

      {/* mobile */}
      <div className="mobile hero-mobile">
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          // autoPlay
          arrows={false}
        >
          {Array.isArray(hero) &&
            hero.map((e) => (
              <div key={e.mobile_banner?.id} style={{ width: "100vw" }}>
                <div>
                  <Link to={`${e.link}`}>
                    <img
                      src={e.mobile_banner?.original_url}
                      width="100%"
                      alt={e.name}
                    />
                  </Link>
                  {/* {e.page_id && (
                    <Link to={`/page/${e.page_id}`}>
                      <img
                        src={e.mobile_banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.category_id && (
                    <Link to={`/category/${e.category_id}`}>
                      <img
                        src={e.mobile_banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.product_id && (
                    <Link to={`/product/${e.product_id}`}>
                      <img
                        src={e.mobile_banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )}
                  {e.combo_id && (
                    <Link to={`/combo/${e.combo_id}`}>
                      <img
                        src={e.mobile_banner?.original_url}
                        width="100%"
                        alt={e.name}
                      />
                    </Link>
                  )} */}
                </div>
              </div>
            ))}
        </Carousel>
      </div>
    </>
  );
};

export default Hero;
