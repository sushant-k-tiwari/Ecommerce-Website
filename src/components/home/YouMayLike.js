import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  calculateTax,
  getTotalAmount,
  getTotalDiscount,
} from "../features/useCartSlice";
import { useDispatch, useSelector } from "react-redux";

import { fetchYoumaylike } from "../features/actions/youmaylikeActions";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 2,
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

const YouMayLike = () => {
  const dispatch = useDispatch();
  // const [addedToCart, setAddedToCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  const { youmaylike } = useSelector((state) => state.youmaylike);

  useEffect(() => {
    dispatch(fetchYoumaylike());
  }, [dispatch]);

  // add to cart

  let productObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
    slug: "",
  };

  const addToCart = (e) => {
    productObj = {
      id: e.id,
      slug: e.slug,
      title: e.name,
      price: e.selling_price,
      image: e.meta_img?.url,
      mrp: e.mrp,
      discount: e.discount,
    };
    dispatch(addCartProduct(productObj));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(calculateTax());
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
    // setAddedToCart(true);
    setCartProducts((prevCartProducts) => [...prevCartProducts, e.id]);

    // setTimeout(() => {
    //   setAddedToCart(false);
    // }, 80000);
  };

  // add to wishlist
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [heartFilled, setHeartFilled] = useState(null);

  // const [loading, setLoading] = useState(true);

  function wishlistData(id) {
    const data = {
      combo_id: id,
      user_id: user_id,
    };
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/addWishlist`, data, {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          setHeartFilled(id);
          setTimeout(() => setHeartFilled(null), 50000);
        } else {
          alert(res.data.message);
        }
      });
  }

  // go to cart
  const isInCart = (productId) => cartProducts.includes(productId);

  const goToCart = (productId) => {
    if (isInCart(productId)) {
      return (
        <div className="btn_gtc" style={{ cursor: "pointer" }}>
          <p>
            <Link
              className="cartTextMob"
              to="/cart"
              style={{ color: "#05A856" }}
            >
              Go to Cart
            </Link>
            <i className="bi bi-arrow-right"></i>
          </p>
        </div>
      );
    } else {
      return (
        <>
          <div
            className="btn_atc"
            onClick={() => {
              addToCart(productId);

              alert("Product added to cart successfully");
            }}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-cart cartTextMob" id={productId.id}>
              Add to Cart
            </i>
          </div>
        </>
      );
    }
  };

  const [isArrow, setIsArrow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsArrow(window.innerWidth > 768); // Set breakpoint according to your needs
    };

    handleResize(); // Initial check on component mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <React.Fragment>
      <section>
        <div className="top-trending container">
          <div className="row" style={{ alignItems: "center" }}>
            <div className="col-6 top-trending-head">
              <h3>You May Like...</h3>
            </div>

            <div className="col-6 viewAllButton">
              <div className="viewAllBtn">
                <Link to={`/combos`}>
                  <button>
                    <span>View All</span>
                    <AiOutlineArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row youmaylikeboxshadow">
            <Carousel
              responsive={responsive}
              showDots={false}
              // infinite={true}
              arrows={isArrow}
            >
              {Array.isArray(youmaylike) &&
                youmaylike.map((e) => (
                  <div
                    className="item carouselItemCard"
                    key={e.id}
                    style={{ marginRight: ".8rem" }}
                  >
                    <div className="newComboCart">
                      <div className="cart-img-sec">
                        <Link
                          onClick={() => wishlistData(e.id)}
                          className="addtofav"
                        >
                          <ul>
                            <li className="youMayLikeHeart">
                              {heartFilled === e.id ? (
                                <i
                                  style={{ color: "#fe9e2d" }}
                                  className="bi bi-heart-fill"
                                ></i>
                              ) : (
                                <i className="bi bi-heart"></i>
                              )}
                            </li>
                          </ul>
                        </Link>
                        <Link to={`/combo/${e.slug}`}>
                          <img src={e.meta_img?.url} alt="img" width="100%" />
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3">
                          <span>{e.name.substring(0, 20) + "..."}</span>
                        </div>
                        <div className="packOfDiv">
                          <span className="packof">(Pack of {e.packqty})</span>
                        </div>
                        <div
                          className="price-sec"
                          style={{ padding: "0 8px 0 20px" }}
                        >
                          <span className="sp priceMargin">
                            ₹{Math.round(e.selling_price)}
                          </span>
                          <del className="mrp priceMargin">₹{e.mrp}</del>
                          <span className="discount">{e.discount}% OFF</span>
                        </div>
                        <div className="card-btn-sec ">
                          {isInCart(e.id) ? (
                            goToCart(e.id)
                          ) : (
                            <div
                              className="btn_atc"
                              onClick={() => {
                                addToCart(e);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <p className="cartTextMob" id={e.id}>
                                Add to Cart
                              </p>
                            </div>
                          )}
                          {/* <div
                            className="btn_atc"
                            onClick={() => {
                              addToCart(e);

                              alert("product added to cart successfully");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <i className="bi bi-cart" id={e.id}>
                              Add to Cart
                            </i>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Carousel>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default YouMayLike;
