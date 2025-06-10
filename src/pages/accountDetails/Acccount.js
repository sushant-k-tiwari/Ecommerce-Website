import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const navigate = useNavigate();

  // Noraml Login
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  // Gmail Login
  const gmailName = localStorage.getItem("gmailname");
  const gmailemail = localStorage.getItem("gmailemail");
  const gmailimg = localStorage.getItem("gmailimg");

  // facebook login
  const facebookName = localStorage.getItem("Facebook-name");
  const facebookImg = localStorage.getItem("Facebook-img");
  const facebookEmail = localStorage.getItem("Facebook-email");

  return (
    <>
      <HomeLayout>
        <section className="section pb-5 pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-3 first">
                <Sidebar />
              </div>

              <div className="col-md-9">
                <div className="card">
                  <div className="row">
                    <div className="col-md-3" id="edit-button">
                      {gmailimg ? (
                        <img
                          src={gmailimg}
                          style={{ width: "200px", height: "200px",borderRadius:"100%" }}
                          alt="imgg"
                        />
                      ) : (
                        <img
                          src={facebookImg}
                          style={{ width: "200px", height: "200px",borderRadius:"100%" }}
                          alt="imgg"
                        />
                      )}
                    </div>
                    <div className="col-md-6 second">
                      {name ? (
                        <h5 className="changePassword">{name}</h5>
                      ) : gmailName ? (
                        <h5 className="changePassword">{gmailName}</h5>
                      ) : (
                        <h5 className="changePassword">{facebookName}</h5>
                      )}

                      {email ? (
                        <p>Email: {email}</p>
                      ) : gmailemail ? (
                        <p>{gmailemail}</p>
                      ) : (
                        <p>{facebookEmail}</p>
                      )}

                      <p>Phone: {phone}</p>
                      <div className="changePassword" id="changePass">
                        <i className="bi bi-lock-fill"></i>
                        <h6>Change Password</h6>
                      </div>
                    </div>
                    <div className="col-md-3 ">
                      <div className=" edits d-flex">
                        <h6>
                          Edit <i className="bi bi-pen"></i>{" "}
                        </h6>
                      </div>
                      <h6 className="edit d-flex">
                        <span className="green">Verified</span>
                        <img
                          className="verified"
                          src="./assets/img/verified.png"
                          width="25px"
                          height="25px"
                          alt="imgg"
                        />
                      </h6>
                    </div>
                    <div>
                      <button
                        style={{ marginTop: "2rem" }}
                        onClick={() => {
                          localStorage.removeItem("token");
                          localStorage.removeItem("gmail-token");
                          localStorage.removeItem("gmailName");
                          localStorage.removeItem("gmailemail");
                          localStorage.removeItem("gmailimg");
                          localStorage.removeItem("facebook-token");
                          localStorage.removeItem("Facebook-name");
                          localStorage.removeItem("Facebook-email");
                          localStorage.removeItem("Facebook-img");
                          localStorage.removeItem("id");
                          localStorage.removeItem("name");
                          localStorage.removeItem("phone");
                          localStorage.removeItem("email");
                          alert("Logout Successfull");
                          navigate("/");
                        }}
                      >
                        logout
                      </button>
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

export default Account;
