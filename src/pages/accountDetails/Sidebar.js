import React from "react";
import "./accountDetails.css";



import { NavLink, useNavigate } from "react-router-dom";


const Sidebar = () => {
  // const navigate = useNavigate();
  // const navigate = useNavigate();

 
  // function handleClick() {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("id");
  //   localStorage.removeItem("name");
  //   localStorage.removeItem("phone");
  //   localStorage.removeItem("email");
  //   alert("Logout Successfull");
  //   navigate("/");
   
  // }

  return (
    <>
      <section className="section  ">
        <div className="container">
          <div className="row">
            <div className=" first desktop">
              <div className="card">
                <div className="account d-flex">
                  <NavLink to="/Acccount" className={"user"}>
                    My Profile
                  </NavLink>
                  <i className="bi bi-caret-right-fill bii"></i>
                </div>
                <hr className="hr" />
                <div className="account d-flex">
                  <NavLink to="/Place" className={"user"} type="button">
                    My Addresses
                  </NavLink>
                  <i className="bi bi-caret-right-fill bii"></i>
                </div>
                <hr className="hr" />
                <div className="account d-flex">
                  <NavLink to="/Wishlist" className={"user"} type="button">
                    My Wishlist
                  </NavLink>
                  <i className="bi bi-caret-right-fill bii"></i>
                </div>
                <hr className="hr" />
                <div className="account d-flex">
                  <NavLink to="/Orders" className={"user"} type="button">
                    My Orders
                  </NavLink>
                  <i className="bi bi-caret-right-fill bii"></i>
                </div>
                <hr className="hr" />
                <div className="account d-flex">
                  <NavLink to="/Wallet" className={"user"} type="button">
                    Saved Cards/payments
                  </NavLink>
                  <i className="bi bi-caret-right-fill bii"></i>
                </div>
                <hr className="hr" />
                {/* <div className="account d-flex">
                  <button
                    to=" "
                    className={"user"}
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      localStorage.removeItem("name");
                      localStorage.removeItem("phone");
                      localStorage.removeItem("email");
                      alert("Logout Successfull");
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                  <i className="bi bi-caret-right-fill bii"></i>
                </div> 
                 <div>
                      <NavLink
                        style={{ marginTop: "2rem" }}
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("id");
                          localStorage.removeItem("name");
                          localStorage.removeItem("phone");
                          localStorage.removeItem("email");
                          alert("Logout Successfull");
                          navigate("/");
                        }}
                      >
                        logout
                      </NavLink>
                    </div>
              </div>
            </div>
          </div>

            <div className="mobile">
            <div id="mySidenav" className="sidenav">
              <Link
                to="javascript:void(0)"
                className="closebtn"
                onclick="closeNav()"
              >
                &times;
              </Link>
              <Link to="#">My Profile</Link>
              <Link to="#">My Address</Link>
              <Link to="#">My whishlist</Link>
              <Link to="#">My Orders</Link>
              <Link to="#">My Wallet</Link>
              <Link to="#">Logout</Link>
            </div>
            <div id="main">
              <span
                style={{ fontSize: "30px;cursor:pointer" }}
                onclick="openNav()"
              >
                &#9776;
              </span>
            </div>
              </div>*/}
                <div>
                  {/* <NavLink
                    style={{ marginTop: "2rem" }}
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("id");
                      localStorage.removeItem("name");
                      localStorage.removeItem("phone");
                      localStorage.removeItem("email");
                      alert("Logout Successfull");
                      navigate("/");
                    }}
                   
                  >
                    logout
                  </NavLink> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};


          export default Sidebar;


