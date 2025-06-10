import React from "react";
import "./incAll.css"


const Fetures = () => {
  return (
    <>

      {/* desktop */}
      <section className="features desktop">
        <div className="container">
          <div className="row">
            <div className="col-md-3 justify-content-sm-start">
              <div className="feat-item">
                <i className="bi bi-truck"></i>
                <span>Free Shipping</span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="feat-item">
                <i className="bi bi-lock"></i>
                <span>100% Secure Payment</span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6">
              <div className="feat-item">
                <i className="bi bi-patch-check"></i>
                <span>Assured Quality</span>
              </div>
            </div>
            <div className="col-md-3 col-sm-6" >
              <div className="feat-item">
                <i className="bi bi-hand-thumbs-up"></i>
                <span>Assured Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* mobile */}
      <section className="features mobile mt-2">
        <div className="container">
          <div className="row" style={{margin: "auto",justifyContent: "space-evenly" }}>
            <div className="col">
              <div className="feat-item">
                <i className="bi bi-truck"></i>
                <span>Free Shipping</span>
              </div>
            </div>
            <div className="col">
              <div className="feat-item">
                <i className="bi bi-lock"></i>
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>
          <div className="row" style={{margin: "auto",justifyContent: "space-evenly" }}>
            <div className="col">
              <div className="feat-item">
                <i className="bi bi-patch-check"></i>
                <span>Assured Quality</span>
              </div>
            </div>
            <div className="col" >
              <div className="feat-item">
                <i className="bi bi-hand-thumbs-up"></i>
                <span>Assured Quality</span>
              </div>
            </div>
          </div>
        </div>
    </section >
    </>
  );
};

export default Fetures;
