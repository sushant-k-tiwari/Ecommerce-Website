// import React, { useState, useEffect } from "react";
// import "./login.css";
// import { Link } from "react-router-dom";
// import HomeLayout from "../../layouts/HomeLayout";
// import axios from "axios";

// const Login = () => {
//   if user is not login then redirect to login page else show account details

//   const navigate = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/Account");
//     }
//   });

//   // Post APi

//   const url = `/login-mobile`;
//   const [data, setData] = useState({
//     phone: "",
//   });

//   function submit(e) {
//     e.preventDefault();
//     axios
//       .post(url, {
//         phone: data.phone,
//       },{
//         headers:{
//           'X-Authorization':'CxD6Am0jGol8Bh21ZjB9Gjbm3jyI9w4ZeHJAmYHdfdP4bCClNn7euVxXcGm1dvYs'
//         }
//       })

//       .then((res) => {
//         console.log(res.data);
//         alert(res.data.message);
//         navigate(`/VerifyOtp`, {
//           state: {
//             phone: data.phone,
//           },
//         });
//       });
//   }

//   function handle(e) {
//     const newdata = { ...data };
//     newdata[e.target.id] = e.target.value;
//     setData(newdata);
//     console.log(newdata);
//   }

//   return (
//     <>
//       <HomeLayout>
//         <section id="loginBg" style={{ marginTop: "5rem" }}>
//           <div className="container py-5">
//             <div className="row">
//               <div className="col-lg-3"></div>
//               <div className="col-lg-6">
//                 <div className="loginCard py-5">
//                   <div className="loginCard-head">
//                     <div className="row">
//                       <div className="col-8">
//                         <div className="off-det">
//                           <h1>Flat ₹200* OFF+ Free Shipping</h1>
//                           <span>On Your First Order</span>
//                         </div>
//                         <div className="off-coup">
//                           <span>Coupon :</span>
//                           <span className="coup-ex">COMBO20</span>
//                         </div>
//                       </div>
//                       <div className="col-4">
//                         <div className="img-sec">
//                           <Link to="/Account">
//                             <img src="assets/img/gift.png" alt="offer-gift" />
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="loginCard-body py-5">
//                     <div className="row text-center">
//                       <div className="d-flex">
//                         <p>
//                           <strong>LogIn</strong> or <strong>SignUp</strong>
//                         </p>
//                       </div>
//                       <div className="form-group">
//                         <div className="input-group mb-3">
//                           <span className="input-group-text" id="basic-addon1">
//                             +91
//                           </span>
//                           <form onSubmit={(e) => submit(e)}>
//                             <input
//                               onChange={(e) => handle(e)}
//                               id="phone"
//                               value={data.phone}
//                               type="text"
//                               className="form-control"
//                               placeholder="Enter Mobile Number*"
//                               aria-label="Username"
//                               aria-describedby="basic-addon1"
//                             />
//                             <button
//                               className="btn"
//                               style={{
//                                 backgroundColor: "#FE9E2D",
//                                 color: "#ffffff",
//                                 padding: "0.6rem",
//                               }}
//                             >
//                               Proceed
//                             </button>
//                           </form>
//                           {/* <form>
//                             <input></input>
//                             <input></input>
//                           </form> */}
//                         </div>
//                       </div>
//                       <div className="social-login mt-3">
//                         <span>or Login Via</span>
//                         <div className="d-flex my-5">
//                           <div className="col-4">
//                             <Link to="/" className="social-link">
//                               <img src="assets/img/social/google.png" alt="" />
//                             </Link>
//                           </div>
//                           <div className="col-4">
//                             <Link to="/" className="social-link">
//                               <img
//                                 src="assets/img/social/facebook.png"
//                                 alt=""
//                               />
//                             </Link>
//                           </div>
//                           <div className="col-4">
//                             <Link to="/Signup" className="social-link">
//                               <img src="assets/img/social/email.png" alt="" />
//                             </Link>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="loginCard-footer text-center">
//                     <div className="row">
//                       <div className="already">
//                         <p>
//                           Already have an Account ?{" "}
//                           <Link to="/Signin">SIGN IN</Link>
//                         </p>
//                       </div>
//                       <div className="consent">
//                         <p>By Creating an Account I accept the site's</p>
//                         <Link to="/">Terms and Conditions</Link>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-lg-3"></div>
//             </div>
//           </div>
//         </section>
//         <section className="features">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-4">
//                 <div className="feat-item">
//                   <i className="bi bi-truck"></i>
//                   <span>Free Shipping</span>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="feat-item">
//                   <i className="bi bi-lock"></i>
//                   <span>100% Secure Payment</span>
//                 </div>
//               </div>
//               <div className="col-md-4">
//                 <div className="feat-item">
//                   <i className="bi bi-patch-check"></i>
//                   <span>Assured Quality</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </HomeLayout>
//     </>
//   );
// };

// export default Login;
