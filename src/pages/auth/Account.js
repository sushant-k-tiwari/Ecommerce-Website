import React from "react";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";

const Account = () => {
  const navigate = useNavigate();

  
  const user_id = localStorage.getItem("id");
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  return (
    <>
      <HomeLayout>
        <div className="Container" style={{ marginTop: "5rem" }}>
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">DASHBOARD</h2>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Your ID = {user_id}</li>
              <li className="list-group-item">NAME = {name}</li>
              <li className="list-group-item">PHONE = {phone}</li>
              <li className="list-group-item">EMAIL = {email}</li>
            </ul>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("id");
              localStorage.removeItem("name");
              localStorage.removeItem("phone");
              localStorage.removeItem("email");
              alert("Logout Successfull");
              navigate("/");
            }}
            classNameName="btn btn-danger" style={{ backgroundColor: "#FE9E2D",
              color: "#ffffff",
              padding: "0.6rem"}}
          >
            LOGOUT
          </button>
        </div>
      </HomeLayout>
    </>
  );
};

export default Account;
