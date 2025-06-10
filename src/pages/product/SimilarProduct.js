import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

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

const SimilarProduct = (props) => {
  // Related Product
  const slug = props.id;
  const [related, setRelated] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization":
          `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/combo/${slug}`, options);
      setRelated(response.data.related);
        
      }catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers["retry-after"]);
          setTimeout(() => {
            fetchData();
          }, retryAfter * 1000);
        } else {
          setError(error.message);
        }
      }
      
    }
    fetchData();
  }, [slug]);

  if (error) {
    console.log(error)
  }

  return (
    <>
      <div className="container mt-2 mb-5">
        <div className="row">
          <Carousel
            responsive={responsive}
            showDots={false}
            infinite={true}
            draggable={true}
            swipeable={true}
            removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
            className=""
          >
            
            {related.map((e) => (
              <div className="item" key={e.id} style={{ marginRight: "20px" }}>
                <div className="newComboCart">
                  <div className="cart-img-sec mr-3" style={{ position: "relative" }}>
                    <Link className="addtofav">
                      <i className="bi bi-heart" style={{ color: "#464646", position: "absolute", top: ".3rem", right: ".8rem" }}></i>
                    </Link>
                    <Link to={`/combo/${e.slug}`}>
                      <img src={e.meta_img?.url} alt="img" width='100%'></img>
                    </Link>
                  </div>

                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name}</span>
                    </div>
                    <div>
                      <span className="packof">(Pack of 2)</span>
                    </div>
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="sp">₹{e.selling_price}</span>
                      </div>
                      <div className="col-4">
                        <del className="mrp">₹{e.mrp}</del>
                      </div>
                      <div className="col-4">
                        <span className="discount">{e.discount}% OFF</span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <div className="btn_atc">
                        
                          <i
                            className="bi bi-cart"
                            id={e.id}
                            style={{ cursor: "pointer" }}
                          >
                            Add to Cart
                          </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>

    </>
  );
};

export default SimilarProduct;
