import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./empty.css";
import { Link } from "react-router-dom";

const Emptycart = () => {
  return (
    <>
      <HomeLayout>
        <div classNameName="container">
          <div w-full>
            <div className="container-fluid navigator ">
              <div className="row text-center" id="progessbarRow">
                <ul className="" id="progressbar">
                  <div className="col-md-4 col-sm-4">
                    <li className="active" id="bag">
                      Bag
                    </li>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <li id="address">Address</li>
                  </div>
                  <div className="col-md-4 col-sm-4">
                    <li id="payment">Payment</li>
                  </div>
                </ul>
              </div>
              <hr />

              <div className="container ">
                <div className="first">
                  <p className="col-12 d-flex justify-content-center">
                    Your bag is Empty
                  </p>
                </div>
                <div className="col-12 d-flex justify-content-center empty-bag">
                  <img
                    src="assets/img/empty-card.png"
                    className="image-fluid"
                    alt="img"
                  ></img>
                </div>
              </div>
              <div className="second">
                <p className="col-12 d-flex justify-content-center text-center">
                  {" "}
                  Looks like you haven't added
                  <br /> anything to cart yet{" "}
                </p>
              </div>
              <div className="col-12 p-2 d-flex justify-content-center">
                <Link to="/">
                  <a className="btn_atc" href="#home" role="button" >
                    Go Back to Home
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default Emptycart;
