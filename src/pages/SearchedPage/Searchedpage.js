import React from "react";
import "./SearchedPage.css";
import { useLocation } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  getTotalDiscount,
} from "../../components/features/useCartSlice";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";

const Searchedpage = () => {
  const location = useLocation();
  const data = location.state;

  const dispatch = useDispatch();

  // add to cart for combo

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
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
  };

  // add to cart single product

  let SingleproductObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
    slug: "",
  };

  const addToSingleCart = (p) => {
    SingleproductObj = {
      id: p.id,
      title: p.name,
      slug: p.slug,
      price: p.selling_price,
      image: p.thumbnail_img?.original_url,
      mrp: p.mrp,
      discount: p.discount,
    };

    dispatch(singleaddCartProduct(SingleproductObj));
    dispatch(getsingleCartCount());
    dispatch(getsingleSubTotal());
    dispatch(getsingleTotalAmount());
    dispatch(getsingleTotalDiscount());
  };


  

  let comboSection = null;
  if (data.combos && data.combos.length >= 1) {
    comboSection = (
      <>
        <h3>Precurated Combo</h3>
        <div className="row">
          {data.combos.map((e) => (
            <div className="col-lg-3 col-md-3" key={e.id}>
              <div className="newComboCart">
                <div className="cart-img-sec" style={{ position: "relative" }}>
                  <Link className="addtofavCategory">
                    <i
                      className="bi bi-heart"
                      style={{
                        position: "absolute",
                        right: ".8rem",
                        top: ".5rem",
                      }}
                    ></i>
                  </Link>
                  <Link to={`/combo/${e.id}`}>
                    <img src={e.meta_img?.original_url} alt="img"></img>
                  </Link>
                </div>

                <div className="card-det-sec">
                  <div className="headingCard pt-3">
                    <span>{e.name.substring(0, 40)}</span>
                  </div>
                  <div>
                    <span className="packof">(Pack of 2)</span>
                  </div>
                  <div className="price-sec">
                    <div className="col-4" style={{ textAlign: "end" }}>
                      <span className="spSingleProduct">
                        ₹{e.selling_price}
                      </span>
                    </div>
                  </div>
                  <div className="card-btn-sec ">
                    <div className="btn_atc">
                      {/* <Link> */}
                      <div
                        // onClick={() => {
                        //   addToCart(e);
                        //   alert("product added to cart successfully")
                        // }}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          addToCart(e);
                          alert("product added to cart successfully");
                        }}
                      >
                        <i
                          className="bi bi-cart"
                          id={e.id}
                          style={{ cursor: "pointer" }}
                        >
                          Add to Cart
                        </i>
                      </div>

                      {/* </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <HomeLayout>
        <div className="container">
          {/* <h2>Search For { data }</h2> */}

          {/* <div>
            <h3>Search Result For: </h3>
            <span></span>
          </div> */}

          {comboSection}
        </div>
        <div className="container">
          <h3>Bulid Your Own Combo</h3>
          <div className="row">
            {data.products.data.map((e) => (
              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
                    <Link className="addtofavCategory">
                      <i
                        className="bi bi-heart"
                        style={{
                          position: "absolute",
                          right: ".8rem",
                          top: ".5rem",
                        }}
                      ></i>
                    </Link>
                    <Link to={`/products/${e.id}`}>
                      <img src={e.thumbnail_img?.original_url} alt="img"></img>
                    </Link>
                  </div>
                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name.substring(0, 40)}</span>
                    </div>
                    {/* <div>
                      <span className="packof">(Pack of 2)</span>
                    </div> */}
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="spSingleProduct">
                          ₹{e.selling_price}
                        </span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <div
                        className="btn_atc"
                        onClick={() => {
                          addToSingleCart(e);
                          alert("product added to cart successfully");
                        }}
                      >
                        {/* <Link> */}
                        <i
                          className="bi bi-cart"
                          id={e.id}
                          style={{ cursor: "pointer" }}
                        >
                          Add to Cart
                        </i>
                        {/* </Link> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Searchedpage;
