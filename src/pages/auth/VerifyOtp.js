import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./verifyotp.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);

  const [data, setData] = useState({
    otp: "",
  });
  const url = `/auth-mobile/${data.otp}`;

  function submit(e) {
    e.preventDefault();
    axios
      .post(url, {
        otp: data.otp,
        phone: location.state?.phone,
      })
      .then((res) => {
        console.log(res.data);
        alert("Login sucessfully");

        const token = res.data.token;
        const user_id = res.data.id;

        localStorage.setItem("token", token);
        localStorage.setItem("id", user_id);
        // navigate("/")
        if (res.data.message?.name === null) {
          navigate("/Account");
        } else {
          navigate("/");
        }
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <HomeLayout>
      <div className="container" style={{ marginTop: "8rem" }}>
        <h1 className="tect-center">Verify Your OTP</h1>
        <div className="form-group">
          <div className="input-group mb-3">
            <form onSubmit={(e) => submit(e)}>
              <input
                onChange={(e) => handle(e)}
                id="otp"
                value={data.otp}
                type="text"
                aria-label="user name"
                placeholder="Enter OTP"
                className="form-control"
                aria-describedby="basic-addon1"
              />
              <button className="btn">submit</button>
            </form>
          </div>
        </div>
        {/* <input type="text" aria-label="Last name" className="form-control" />
          <input type="text" aria-label="First name" className="form-control" />
          <input type="text" aria-label="Last name" className="form-control" /> */}
      </div>

      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="feat-item">
                <i className="bi bi-truck"></i>
                <span>Free Shipping</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feat-item">
                <i className="bi bi-lock"></i>
                <span>100% Secure Payment</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feat-item">
                <i className="bi bi-patch-check"></i>
                <span>Assured Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HomeLayout>
  );
};

export default VerifyOtp;
