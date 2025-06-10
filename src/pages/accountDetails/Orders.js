import React, { useState,useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [ordersProduct, setOrdersProduct] = useState([]);


  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/signin", -1);
  //   } else if (!localStorage.getItem("gmail-token")) {
  //     navigate("/signin");
  //   } else if (!localStorage.getItem("facebook-token")) {
  //     navigate("/signin");
  //   }
  // });

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/yourOrders`,
          options
        );
        setOrders(response.response.data.orders);
        setOrdersProduct(response.data.orders.orderproducts);
      
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers["retry-after"]);
          setTimeout(() => {
            fetchData();
          }, retryAfter * 1000);
        }
      }
    }
    fetchData();
  }, [token]);

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
                  <div className="col-md-12">
                    <h4>MY ORDERS</h4>
                  </div>
                </div>
                {orders.map((e) => (
                  <div className="card " id="order-card" key={e.id}>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          // src={e.combo?.meta_img?.url}
                          className="order"
                          alt="img"
                        />
                      </div>
                   
                          <div className="col-md-6">
                            <h6>ORDER NUMBER</h6>
                            <p>
                              {e.order_id}
                              <br />1 Item(s) Delivered
                            </p>
                          </div>
                       
                      <div className="col-md-4 order-button-div">
                        <Link
                          to="/"
                          className=" btn-sm order-button"
                          type="button"
                        >
                          {" "}
                          Order Details
                          <i className="bi bi-chevron-compact-right "></i>
                        </Link>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-2">
                        <p style={{ FontSize: "14px" }}>
                         {e.combo?.name}
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          Package delivered On <br />
                          <span style={{ color: "green", FontSize: " small" }}>
                            Sun, 3 Nov 2022
                          </span>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <Link to="/" className="feedback">
                          <span className="feedback">
                            Share your experience{" "}
                            <i className="bi bi-arrow-right"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="card " id="order-card">
                  <div className="row" id="order-body">
                    <div className="col-md-2">
                      <img
                        src="./assets/img/wishlist.png"
                        className="order"
                        width="100px"
                        height="100px"
                        alt="imgg"
                      />
                    </div>
                    <div className="col-md-6">
                      <h6>ORDER NUMBER</h6>
                      <p>
                        CN-112229518-5498583
                        <br />1 Item(s) Delivered
                      </p>
                    </div>
                    <div className="col-md-4 order-button-div">
                      <Link
                        to="/"
                        className=" btn-sm order-button"
                        type="button"
                      >
                        {" "}
                        Order Details
                        <i className="bi bi-chevron-compact-right "></i>
                      </Link>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-2">
                      <p style={{ FontSize: "14px" }}>
                        Saffron-Scrub <br />
                        Combo - QTY 1
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        Package delivered On <br />
                        <span style={{ color: "green", FontSize: " small" }}>
                          Sun, 3 Nov 2022
                        </span>
                      </p>
                    </div>
                    <div className="col-md-4">
                      <Link to="/" className="feedback">
                        <span className="feedback">
                          Share your experience{" "}
                          <i className="bi bi-arrow-right"></i>
                        </span>
                      </Link>
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

export default Orders;
