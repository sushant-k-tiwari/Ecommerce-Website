import React, { useState, useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Link } from "react-router-dom";

const Return = () => {
    const [terms, setTerms] = useState([]);
    useEffect(() => {
      async function fetchData() {
        const options = {
          headers: {
            "X-Authorization": `${process.env.REACT_APP_HEADER}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            mode: "cors",
            credentials: "include",
          },
        };
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/page/returns-and-refunds`,
            options
          );
          setTerms(response.data);
        } catch (error) {
          if (error.response && error.response.status === 429) {
            const retryAfter = parseInt(error.response.headers["retry-after"]);
            setTimeout(() => {
              fetchData();
            }, retryAfter * 1000);
          }
        }
      }
      fetchData();
    }, []);
  return (
    <>
     <HomeLayout>
        <div className="container">
          <div className="row">
            <img
              src={terms.thumbnail?.url}
              alt="terms"
              width="100%"
              style={{ marginTop: "1rem" }}
            />
          </div>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link>Categories</Link>
              </li>
              <li className="breadcrumb-item">
                <Link className="categoriesName">{terms.name}</Link>
              </li>
            </ol>
          </nav>
          <hr />
          <div className="col-md-12" dangerouslySetInnerHTML={{ __html: terms.page }} />
        </div>
      </HomeLayout>

    </>
  )
}

export default Return