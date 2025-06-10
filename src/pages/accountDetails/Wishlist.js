import React, { useEffect, useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Wishlist = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
     navigate("/signin")
     alert("login please")
    }
  });
  const token = localStorage.getItem("token");

  const [wishlist, setWishlist] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/get-wishlists`,
          options
        );
        setWishlist(response.data.wishlists);
      } catch (error) {
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
  }, [token]);
  if (error) {
    console.log(error)
  }

  return (
    <>
      <HomeLayout>
        <section className="section pt-5 pb-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 first">
                <Sidebar />
              </div>
              <div className="col-md-9">
                <div className="row">
                  <div className="col-md-7">
                    <h4>MY WISHLIST</h4>
                  </div>
                </div>

                <div className="row" id="card-secction">
                  {wishlist && wishlist.map((e) => (
                    <div className="col-4" key={e.id}>
                      <div className="card">
                        {e.product?.thumbnail_img?.original_url ? (
                          <img
                            src={e.product?.thumbnail_img?.original_url}
                            className="card-img-top"
                            alt="..."
                          />
                        ) : (
                          <img
                            src={e.combo?.meta_img?.url}
                            className="card-img-top"
                            alt="..."
                          />
                        )}

                        {e.product?.name.substring(0, 40) ? (
                          <h5 className="card-title">
                            {e.product?.name.substring(0, 40)}
                          </h5>
                        ) : (
                          <h5 className="card-title">{e.combo?.name}</h5>
                        )}

                        <div className="d-flex">
                          {e.product?.mrp ? (
                            <p
                              className="card-text"
                              style={{ textDecoration: "line-through" }}
                            >
                              ₹{e.product?.mrp}{" "}
                            </p>
                          ) : (
                            <p
                              className="card-text"
                              style={{ textDecoration: "line-through" }}
                            >
                              ₹{e.combo?.mrp}{" "}
                            </p>
                          )}

                          {e.product?.selling_price ? (
                            <h5 className="rupee" style={{ marginLeft: 20 }}>
                              {" "}
                              ₹{e.product?.selling_price}
                            </h5>
                          ) : (
                            <h5 className="rupee" style={{ marginLeft: 20 }}>
                              {" "}
                              ₹{e.combo?.selling_price}
                            </h5>
                          )}
                        </div>
                        <a href="#/" className="btn btn-primary move-to-cart">
                          Move to Cart
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>{" "}
    </>
  );
};

export default Wishlist;
