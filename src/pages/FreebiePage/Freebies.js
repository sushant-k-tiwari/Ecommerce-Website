import React, {  useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./Freebies.css";
import { Link } from "react-router-dom";
import {
  freebiesaddCartProduct,
  getfreebiesTotalAmount,
  getfreebiesCartCount,
} from "../../components/features/freebiesCartSlice";
import { useDispatch, useSelector } from "react-redux";
import FreebiesCart from "./FreebiesCart";
import { fetchFreebies } from "../../components/features/actions/freebiesActions";

const Freebies = () => {
  const dispatch = useDispatch();
  // freebies product Api
  const {  freeebies,loading } = useSelector((state) => state.freeebies);
  
    useEffect(() => {
      dispatch(fetchFreebies());
    }, [dispatch]);
 

  // ADD to Cart freebies product
 
  let productObj = {
    id: "",
    title: "",
    price: "",
    image: "",
  };

  const addToCart = (e) => {
    productObj = {
      id: e.id,
      title: e.name,
      price: e.selling_price,
      image: e.thumbnail_img?.original_url,
    };

    dispatch(freebiesaddCartProduct(productObj));
    dispatch(getfreebiesCartCount());
    dispatch(getfreebiesTotalAmount());
  };

  // Freebies total amount
  const { freebiestotalAmount } = useSelector((state) => state.freebies);

  const { singlesubAmount } = useSelector((statee) => statee.SingleCart);

  // For freebies discount part

  let discount = 0;
  switch (true) {
    case singlesubAmount >= 1000 && singlesubAmount < 3000:
      discount = (singlesubAmount * 20) / 100;
      break;
    case singlesubAmount >= 3000 && singlesubAmount < 5000:
      discount = (singlesubAmount * 30) / 100;
      break;
    case singlesubAmount >= 5000 && singlesubAmount <= 10000:
      discount = (singlesubAmount * 40) / 100;
      break;
    case singlesubAmount >= 10000 && singlesubAmount <= 15000:
      discount = (singlesubAmount * 50) / 100;
      break;
    case singlesubAmount >= 15000 && singlesubAmount <= 20000:
      discount = (singlesubAmount * 60) / 100;
      break;
    case singlesubAmount >= 20000 && singlesubAmount <= 100000:
      discount = (singlesubAmount * 100) / 100;
      break;
    default:
      discount = 0;
      break;
  }

  let ExtraFreebiesAmount = freebiestotalAmount - discount;

  let ExtraFreebiesAmountSection = null;
  if (freebiestotalAmount > discount) {
    ExtraFreebiesAmountSection = (
      <h3>
        Extra Freebie Amount ={" "}
        <span style={{ color: "#fe9e2d" }}>
          ₹ {parseFloat(ExtraFreebiesAmount).toFixed(0)}
        </span>
      </h3>
    );
  }

  const sendData = () => {
    alert("Your Freebies Amount Limit Exceeded");
  };

  

  return (
    <>
      <HomeLayout>
        <section className="cart">
          <div className="container" id="freebie">
            <div className="row">
              <nav>
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="/cart"> Cart</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/" className="active">
                      Freebies
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="row">
              <h1 className="heading">Selected Freebies In Your Cart</h1>
              <div className="col-md-8">
                <FreebiesCart />
              </div>
              <div className="col-md-4 checkout-sec">
                <h3>
                  Allowed Freebie Value = <span>{discount}</span>
                </h3>
                <h3>
                  Availed Freebie Amount = <span>₹ {freebiestotalAmount}</span>
                </h3>
                {ExtraFreebiesAmountSection}
                <div className="d-flex">
                  <div className="col-5">
                  <Link to="/cart" className="btn_1">
                    <i className="bi bi-arrow-left" />
                    Back To Cart
                  </Link>
                  </div>
                  <div className="col-7">
                  <Link to="/payment" className="btn_1">
                    Proceed To Checkout <i className="bi bi-arrow-right" />
                  </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-3"></div>
              <div className="col-md-9">
                 {loading ? (
                <div id="cover-spin"></div>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
                <div className="row">
                  <div className="col-9 availableFreebie">
                    <h3>
                      <i className="bi bi-gift-fill" /> Available{" "}
                      <span>Freebies</span>
                    </h3>
                  </div>
                  <div className="col-3">
                    <select
                      name="sort_by"
                      id="sort_by"
                      className="form-control"
                    >
                      <option value>Sort By</option>
                      <option value>Name</option>
                      <option value>Date Created</option>
                      <option value>Date Updated</option>
                      <option value>Category</option>
                      <option value>Subcategory</option>
                    </select>
                  </div>
                </div>
                <div className="row" id="freebieRow">
                  {freeebies.map((e) => (
                    <div className="col-md-4" key={e.id}>
                      <div>
                        <div
                          className="card freebie-card"
                          style={{ padding: "0rem" }}
                        >
                          <div
                            className="card-body"
                            style={{ padding: "0rem" }}
                          >
                            <div className="img-sec">
                              <img width="100%"
                                src={e.thumbnail_img?.original_url}
                                alt="manestream-fenusmooth-frizzy-hair-treatment-&-hair-shine-kit-300-ml"
                              />
                            </div>
                            <div className="info-sec text-center">
                              <h6>{e.name.substring(0, 40)}</h6>
                              <span>
                                Worth <strong>₹ {e.selling_price}</strong>
                              </span>
                              <br />
                              <span>
                                Expiry Date :{" "}
                                <strong>{e.product_expiry_date}</strong>
                              </span>
                              {freebiestotalAmount > discount ? (
                                <div className="btn-sec">
                                  <div
                                    className="freebie_btn"
                                    onClick={sendData}
                                  >
                                    <i className="bi bi-gift-fill" /> Limit
                                    Exceeded
                                  </div>
                                </div>
                              ) : (
                                <div className="btn-sec">
                                  <div
                                    className="freebie_btn"
                                    onClick={() => {
                                      addToCart(e);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <i className="bi bi-gift-fill" /> Add
                                    Freebie
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> 
                  ))}

                  {/* back to home */}
                  <div>
                    <Link to="/cart" className="btn_1">
                      {" "}
                      <i className="bi bi-arrow-left"></i> Go Back To Cart
                    </Link>
                  </div>

                  {/* number button */}
                  <nav>
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <span className="page-link" aria-hidden="true">
                          ‹
                        </span>
                      </li>
                      <li className="page-item active" aria-current="page">
                        <span className="page-link">1</span>
                      </li>
                      <li className="page-item ">
                        <Link className="page-link" to="/">
                          2
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="/">
                          3
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link className="page-link" to="/">
                          9
                        </Link>
                      </li>
                      <li className="page-item">
                        <Link
                          className="page-link"
                          to="/"
                          rel="next"
                          aria-label="Next »"
                        >
                          ›
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
};

export default Freebies;
