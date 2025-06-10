import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";
import "./thankyou.css"

const Thanks = () => {
  return (
    <>
      <HomeLayout>
        <section>
          <div className="container mt-3 mb-3">
            <div
              className="shadow p-3 bg-body rounded"
              
            >
              <div
                className="row"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                <div
                  className="text-center"
                  style={{ width: "28rem", height: "18rem" }}
                >
                  <div className="card-body">
                    <img
                      src="./assets/img/accountImg/THANKS.png"
                      style={{ width: "25%" }}
                      alt="...."
                    />
                    
                    <h5 style={{ color: "green" }}>THANK YOU</h5>
                    <p>
                      Your payment for this order has been done successfully!
                    </p>
                    <Link to="/" className="btn btn-primary">
                      Continue Shopping
                    </Link>
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

export default Thanks;
