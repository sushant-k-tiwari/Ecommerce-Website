import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./wcc.css";
import axios from "axios";
import axiosRetry from "axios-retry";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
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

const WCC = () => {
  const [brand, setBrand] = useState([]);
  axiosRetry(axios, { retries: 3 });

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/brands`,
        options
      );
      setBrand(response.data);
    }
    fetchData();
  }, []);

  const fliterData = brand.filter((brand) => {
    return brand.focused === "on";
  });

  return (
    <>
      <HomeLayout>
        <section>
          <div className="container">
            <div className="row col-direction" style={{ marginTop: "2rem" }}>
              <div className="col-md-6 sffm">
                <div
                  className="heading"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <h1>
                    We Are <br />
                    <span>COMBONATION!</span>
                  </h1>
                  <p style={{ marginTop: "1rem" }}>
                    Combonation is a one-stop solution to shop for your daily
                    lifestyle needs. We offer a hassle-free curation of
                    pre-curated bundles & wide assortment of top brands to build
                    your own combos. Our expertise in sourcing top-branded
                    products and bringing bundle shopping under one roof is one
                    of our core USPs Pre-curated bundles let the shopper avail
                    highest discounts on top products. Whereas Building your own
                    combo is more fun. Loaded with additional benefits of
                    freebies on your BYOC purchase. Users can avail off up to
                    100% of the purchased value. Happy Shopping
                  </p>
                </div>
              </div>
              <div className="col-md-6 sffm">
                <div className="img1">
                  <img src="./assets/img/wcc/img1.png" alt="img1" />
                </div>
              </div>
            </div>

            <div className="heading-two">
              <h1>
                Benefits of <span>Pre-Curated</span> Combos
              </h1>
            </div>

            <div className="row">
              <div className="col-md-6 sffm">
                <div
                  className="card cart"
                  style={{
                    backgroundColor: "#fe9e2d",
                    border: "2px solid #464646",
                  }}
                >
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">The Best Price in Town</h5>
                      <p className="card-text">
                        Get a minimum of 50% off and a maximum of 90% off on
                        super save combos! <strong>#DealNahiStealHil</strong>
                      </p>
                    </div>
                  </div>
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">Curated... Just for you</h5>
                      <p className="card-text">
                        Our combos are handpicked by industry experts to give
                        you the best variety from top brands.
                      </p>
                    </div>
                  </div>
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">One-stop Shopping</h5>
                      <p className="card-text">
                        Regime-based combos are designed to save you the hasle
                        of hunting for individual products.
                      </p>
                    </div>
                  </div>
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">100% Authenic</h5>
                      <p className="card-text">
                        We guarantee the authenticity of our products, procured
                        using a multitude of sourcing modules.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 sffm">
                <div className="img-two">
                  <img src="./assets/img/wcc/img2.png" alt="img-two" />
                </div>
              </div>
            </div>

            <div className="heading-three">
              <h1>
                Benefits of <span>BYOC</span>
              </h1>
            </div>
            <div className="row col-direction">
              <div className="col-md-6 sffm">
                <div className="img-three">
                  <img src="./assets/img/wcc/img3.png" alt="img-three" />
                </div>
              </div>
              <div className="col-md-6 sffm">
                <div
                  className="card cart"
                  style={{
                    backgroundColor: "#fe9e2d",
                    border: "2px solid #464646",
                  }}
                >
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">Freedom & Flexibility</h5>
                      <p className="card-text">
                        Create your own customer combo! Have your pick of the
                        top brands with irresistible offers.
                      </p>
                    </div>
                  </div>
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">
                        Did someone say Freebies?
                      </h5>
                      <p className="card-text">
                        Get CRAZY TOP-UP offers over and above brand offers.
                        Visit the Bonus Combo Station after building your combo
                        and get free goodies as per your combo value.
                      </p>
                    </div>
                  </div>
                  <div className="card-body cardBody">
                    <div>
                      <i className="fa-sharp fa-solid fa-check"></i>
                    </div>
                    <div>
                      <h5 className="card-subtitle">
                        The Bonous Combo station
                      </h5>
                      <p className="card-text">
                        The more you shop, the more we drop! Get free products
                        upto 100% of your combo value.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="img-fluid">
                <img src="./assets/img/wcc/Group_2591.png" alt="img" />
              </div>

              <div className="BYOC">
                <h1>
                  How to add products through <span>BYOC</span>
                </h1>
                <img src="./assets/img/wcc/Group_1873.png" alt="WCCImg" />
              </div>

              <div className="BYOC">
                <h1>
                  Association with <span>Popular Brands</span>
                </h1>
              </div>

              <div className="container py-10 mt-5 ">
                <Carousel
                  responsive={responsive}
                  className="py-14"
                  swipeable={true}
                  autoPlay
                  arrows={false}
                  centerMode
                  infinite
                >
                  {Array.isArray(fliterData) &&
                    fliterData.map((e) => (
                      <div key={e.id} className="logoBox">
                        <div className="logoImgDiv">
                          <Link to={`/brand/${e.id}`}>
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

              {/* <div className="brand-sections">
                <div className="row">
                  <div className="col-md-3 brand">
                    <img src="./assets/img/wcc/1.png" alt="wccImg" />
                  </div>
                  <div className="col-md-3 brand">
                    <img src="./assets/img/wcc/2.png" alt="wccImg" />
                  </div>
                  <div className="col-md-3 brand">
                    <img src="./assets/img/wcc/3.png" alt="wccImg" />
                  </div>
                  <div className="col-md-3 brand">
                    <img src="./assets/img/wcc/4.png" alt="wccImg" />
                  </div>
                </div>
              </div> */}

              <div className="value">
                <h1>
                  Top 4 Values of <span>COMBONATION</span>
                </h1>
              </div>

              <div className="row roow">
                <div className="col-6 colum">
                  <div
                    className="card cardd"
                    style={{
                      backgroundColor: "#fcfcfc",
                      border: ".5px solid #464646",
                    }}
                  >
                    <img
                      src="./assets/img/wcc/img11.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        100%
                        <br /> Secure Payment
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="card secure"
                    style={{
                      backgroundColor: "#fcfcfc",
                      border: ".5px solid #464646",
                    }}
                  >
                    <img
                      src="./assets/img/wcc/img22.png"
                      className="card-img-top nfm"
                      alt="..."
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        100%
                        <br /> Secure Payment
                      </h4>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row roow">
                <div className="col-6 colum">
                  <div
                    className="card cardd"
                    style={{
                      paddingTop: "0",
                      paddingBottom: "0",
                      // width: "100%",
                      // height: "16rem",
                      backgroundColor: "#fcfcfc",
                      border: ".5px solid #464646",
                    }}
                  >
                    <img
                      src="./assets/img/wcc/img33.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        100%
                        <br /> Authentic
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="card"
                    style={{
                      paddingTop: "0",
                      paddingBottom: "0",
                      // width: "100%",
                      // height: "16rem",
                      backgroundColor: "#fcfcfc",
                      border: ".5px solid #464646",
                    }}
                  >
                    <img
                      src="./assets/img/wcc/img4.png"
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <h4 className="card-title">
                        Assured
                        <br /> Quality
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
};

export default WCC;
