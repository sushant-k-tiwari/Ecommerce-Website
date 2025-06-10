import React from "react";
import HomeLayout from "../../layouts/HomeLayout";
import "./error.css";

const Error = () => {
  return (
    <>
      <HomeLayout>
        <section>
          <div className="container py-5">
            <div
              className="row"
              style={{
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <div className="text-center">
                <img
                  src="./assets/img/banners/error.png"
                  className="errorImg"
                  alt="...."
                />

                <p className="pt-3 errorText">
                  Oops! We can’t seem to find <br></br>
                  the page you’re looking for.
                </p>
              </div>
            </div>
          </div>
        </section>
      </HomeLayout>
    </>
  );
};

export default Error;
