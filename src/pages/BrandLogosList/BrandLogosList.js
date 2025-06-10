import React, {  useEffect } from "react";

import HomeLayout from "../../layouts/HomeLayout";
import "./BrandLogoList.css";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { fetchBrand } from "../../components/features/actions/brandActions";
const BrandLogosList = () => {
  const dispatch = useDispatch();


  const {  brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);
 

  const fliterData = brand.filter((brand) => {
    return brand.focused === "on";
  });

  // if (error) {
  //   console.log(error)
  // }

  // scroll fixes

  useEffect(() => {
    document.body.classList.add("custom-scroll");
    return () => {
      document.body.classList.remove("custom-scroll");
    };
  }, []);

  return (
    <>
      <HomeLayout>
        <div
          className="container"
          style={{
            maxWidth: "1320px",
            marginTop: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div className="main_title">
            <h2>Brands</h2>
            <p>Choose your Favourite Brands !!</p>
          </div>
          <div className="row">
            {fliterData.map((e) => (
              <div className="col-lg-3 col-50" key={e.id}>
                <div>
                <Link to={`/brand/${e.slug}`}
                className="box_topic"
                style={{ transition: "all 0.3s ease-in-out" }}
                >
                    <div className="img-sec">
                      <img
                        src={e.image?.original_url}
                        alt={e.name}
                        style={{ width: "100px", height: "100px" }}
                      />
                    </div>
                    <div className="title text-center my-3">
                      <h3 style={{ fontSize: "1.125rem" }}>{e.name}</h3>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default BrandLogosList;
