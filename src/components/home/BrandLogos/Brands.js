import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Brand.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBrand } from "../../features/actions/brandActions";
import { AiOutlineArrowRight } from "react-icons/ai"

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const Brands = () => {
  const dispatch = useDispatch();

  const { brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);
  // const [brand, setBrand] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     setError(null);
  //     const options = {
  //       headers: {
  //         "X-Authorization": `${process.env.REACT_APP_HEADER}`,
  //         "Cache-Control": "no-cache, no-store, must-revalidate",
  //         mode: "cors",
  //         credentials: "include",
  //       },
  //     };
  //     try {
  //       const response = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}/brands`,
  //         options
  //       );
  //       setBrand(response.data);
  //     } catch (error) {
  //       if (error.response && error.response.status === 429) {
  //         const retryAfter = parseInt(error.response.headers["retry-after"]);
  //         setTimeout(() => {
  //           fetchData();
  //         }, retryAfter * 1000);
  //       } else {
  //         setError(error.message);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, []);
  // if (error) {
  //   console.log(error)
  // }

  const fliterData = brand.filter((brand) => {
    return brand.focused === "on";
  });

  const [isCenterMode, setIsCenterMode] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCenterMode(window.innerWidth > 768); // Set breakpoint according to your needs
    };

    handleResize(); // Initial check on component mount

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="top-brand-deals container">

        <div className="row" style={{ alignItems: "center" }}>
          <div className="col-6 top-trending-head">
            <h3 className="buildyoc desktop" style={{ marginTop: "67px", marginBottom: "47px" }}>
              Build Your Combo From Top Brands
            </h3>
            <h3 className="buildyoc mobile" style={{ marginTop: "16px", marginBottom: "13px" }}>
              Build Your Combo
            </h3>
          </div>

          <div className="col-6 viewAllButton">
            <div className="viewAllBtn">
              <Link to={`/brandlogolist`}>
                <button>
                  View All
                  <AiOutlineArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container py-12">
          <Carousel
            responsive={responsive}
            className="py-14"
            swipeable={true}
            autoPlay
            arrows={false}
            centerMode={isCenterMode}
            infinite
          >
            {Array.isArray(fliterData) &&
              fliterData.map((e) => (
                <div key={e.id} className="logoBox">
                  <div className="logoImgDiv">
                    <Link onClick={handleClick} to={`/brand/${e.slug}`}>
                      <img
                        src={e.image?.original_url}
                        width="80%"
                        alt={e.name}
                      ></img>
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

export default Brands;
