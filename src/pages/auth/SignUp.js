import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
// import Services from "./Services";
import {Link,useNavigate} from "react-router-dom"

const SignUp = () => {
  const navigate = useNavigate()
  const url = `${process.env.REACT_APP_BASE_URL}/register`;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePassword = () => {
  setPasswordShown(!passwordShown);
  };





  function submit(e) {
    e.preventDefault();
    axios
      .post(
        url,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "X-Authorization":
            `${process.env.REACT_APP_HEADER}`,
          },
        }
      )

      .then((res) => {
        console.log(res.data);
        alert(res.data.message);
        navigate('/signin')
      });
  }

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  }

  return (
    <>
      <HomeLayout>

        {/* signup page */}

        <section id="loginBg">
          <div className="container py-5">
            <div className="row">
              <div className="col-lg-3" />
              <div className="col-lg-6">
                <div className="loginCard py-5">
                  <div className="loginCard-head">
                    <div className="row">
                      <div className="col-8">
                        <div className="off-det">
                          <h1>Flat ₹200* OFF+ Free Shipping</h1>
                          <span>On Your First Order</span>
                        </div>
                        <div className="off-coup">
                          <span>Coupon :</span>
                          <span className="coup-ex">COMBO20</span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="img-sec">
                          <img src="https://www.combonation.in/assets_new/img/gift.png" alt="offer-gift" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="loginCard-body py-5">
                    <div className="row text-center">
                      <div className="d-flex"><p><strong>LogIn</strong> or <strong>SignUp</strong></p></div>
                      <form onSubmit={(e) => submit(e)}>
                        <input type="hidden" name="_token" defaultValue="PUyjWFIpnovRlpJnyPhP3Eo3Hu5VJIQZQ5j5HgRC" />
                        <div className="form-group">
                          <div className="input group mb-3">
                            <input type="text" name="name" placeholder="Your Full Name" className="form-control" onChange={(e) => handle(e)}
                              id="name"
                              value={data.name} />
                          </div>
                          <div className="input-group mb-3">
                            <input type="email" name="email" className="form-control" placeholder="Enter Email*" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => handle(e)}
                              id="email"
                              value={data.email} />
                          </div>
                          <div className="form-group mb-3">
                            <input type="password" name="password" placeholder="Enter Your Password" className="form-control password" onChange={(e) => handle(e)}
                              id="password"
                              value={data.password} />
                          </div>
                          <div className="form-group mb-3">
                            <input type={passwordShown ? "text" : "password"} name="password_confirmation" placeholder="Confirm Password" className="form-control password" onChange={(e) => handle(e)}
                            />
                          </div>
                        </div>
                        <div className="form-group mb-2" style={{ textAlign: 'left' }}>
                          <input type="checkbox" name="hide" id="hide"  onClick={togglePassword} />
                          <label htmlFor="hide">Show Password</label>
                        </div>
                        <button  type="submit" className="btn">Proceed To log In</button>
                      </form>
                      <div className="social-login mt-3">
                        <span>or Login Via</span>
                        <div className="d-flex my-5">
                          <div className="col-4">
                            <a href="https://www.combonation.in/login/google" style={{ boxShadow: "none"}}>
                              <img src="https://www.combonation.in/assets_new/img/social/google.png" alt="social-media-img" />
                            </a>
                          </div>
                          <div className="col-4">
                            <a href="https://www.combonation.in/login/facebook" style={{ boxShadow: "none"}}>
                              <img src="https://www.combonation.in/assets_new/img/social/facebook.png" alt="social-media-img" />
                            </a>
                          </div>
                          <div className="col-4">
                            <a href className="https://www.combonation.in/login" style={{ boxShadow: "none"}}>
                              <img src="https://www.combonation.in/assets_new/img/social/email.png" alt="social-media-img" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="loginCard-footer text-center">
                    <div className="row">
                      <div className="already">
                        <p>Already have an Account ? <Link to="/SignIn" >SIGN IN</Link></p>
                      </div>
                      <div className="consent">
                        <p>By Creating an Account I accept the site's</p>
                        <a href>Terms and Conditions</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3" />
            </div>
          </div>
        </section>

        






        {/* data */}
        {/* <div className="container" style={{ marginTop: "10rem" }}>
          <form onSubmit={(e) => submit(e)}>
            <input
              onChange={(e) => handle(e)}
              id="name"
              value={data.name}
              placeholder="Enter Your Name"
            ></input>
            <input
              onChange={(e) => handle(e)}
              id="email"
              value={data.email}
              placeholder="Enter Your Email Id"
            ></input>
            <input
              onChange={(e) => handle(e)}
              id="password"
              value={data.password}
              placeholder="Enter Your Password"
            ></input>
            <input
              onChange={(e) => handle(e)}
              placeholder="Conform Password"
            ></input>
            <button className="btn">submit</button>
          </form>
        </div> */}
      </HomeLayout>
    </>
  );
};

export default SignUp;
