import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./accountDetails.css";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const token = localStorage.getItem("token");

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/signin", -1);
  //   } else if (!localStorage.getItem("gmail-token")) {
  //     navigate("/signin");
  //   } else if (!localStorage.getItem("facebook-token")) {
  //     navigate("/signin");
  //   }
  // });

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getAddress`,
        options
      );
      setAddress(response.data);
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
              <div className="col-md-9 ">
                <div className="row d-flex">
                  <div className="col-md-9" id="address-bar">
                    <h4>MY ADDRESSES</h4>
                  </div>
                  <div className="col-md-3" id="add-address">
                    <a href="#/">
                      <h6>+ ADD A NEW ADDRESS</h6>
                    </a>
                  </div>
                </div>
                <div className="row">
                  {address.map((e) => (
                    <div className="col-md-6" key={e.id}>
                      <div className="card" id="addresscard">
                        <div className="row">
                          <div className="col-md-10">
                            <h6>{e.user?.name}</h6>
                            <p>{e.address}</p>
                            <p>Phone Number:000000000</p>
                          </div>
                          <div className="col-md-2 d-flex">
                            <i className="bi bi-pencil-square pencils"></i>
                            <i className="bi bi-trash3-fill"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* <div className="col-md-6">
                    <div className="card" id="addresscard">
                      <div className="row">
                        <div className="col-md-10">
                          <h6>Reema Gahtori</h6>
                          <p>ABC Apartment, 1007,
                            Flat No-5,<br /> Sector-21A
                            Faridabad, Haryana, 212001 India
                          </p>
                          <p>Phone Number:000000000</p>
                        </div>
                        <div className="col-md-2 d-flex">
                          <i className="bi bi-pencil-square pencils"></i><i className="bi bi-trash3-fill"></i>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
};

export default Address;
