import React, { useState, useEffect, useCallback } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import axios from "axios";
import { Link } from "react-router-dom";
import "./myoc.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchhotdeal } from "../../components/features/actions/hotdealActions";

const MYOC = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [displayedPages, setDisplayedPages] = useState([]);

  // Myoc banner
  const dispatch = useDispatch();
  const { hotdeal } = useSelector((state) => state.hotdeal);
  useEffect(() => {
    dispatch(fetchhotdeal());
  }, [dispatch]);




  const fetchData = useCallback(async (pageNumber) => {
    const options = {
      headers: {
        "X-Authorization": `${process.env.REACT_APP_HEADER}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/view-all-products?page=${pageNumber}`,
        options
      );
      const newData = response.data.data;
      setProducts((prevData) => [...prevData, ...newData]);
      setTotalPages(response.data.last_page);
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = parseInt(error.response.headers["retry-after"]);
        setTimeout(() => {
          fetchData();
        }, retryAfter * 1000);
      } else {
        setError(error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchData(pageNumber);
  }, [fetchData, pageNumber]);

  useEffect(() => {
    const updateDisplayedPages = () => {
      const minPage = Math.max(pageNumber, pageNumber - 4);
      const maxPage = Math.min(totalPages, pageNumber + 4);
      const pages = [];
      for (let i = minPage; i <= maxPage; i++) {
        pages.push(i);
      }
      setDisplayedPages(pages);
    };

    updateDisplayedPages();
  }, [pageNumber, totalPages]);

  const handlePageClick = (page) => {
    setPageNumber(page);
    setProducts([]);
    setLoading(true);
  };


  const renderPageNumbers = () => {
    return displayedPages.map((page) => (
      <li className="page-item" key={page}>
        <Link
          className={`page-link page-number ${pageNumber === page ? "active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Link>
      </li>
    ));
  };



  const handlePreviousClick = () => {
    if (pageNumber > 1) {
      setPageNumber((prevPage) => prevPage - 1);
      setProducts([]);
      setLoading(true);
    }
  };

  const handleNextClick = () => {
    if (pageNumber < totalPages) {
      setPageNumber((prevPage) => prevPage + 1);
      setProducts([]);
      setLoading(true);
    }
  };






  if (error) {
    console.log(error);
  }

  return (
    <>
      <HomeLayout>
        {/* Myoc Banner */}

        <div className="container mt-2">
          {/* desktop  */}
          <div className="desktop">
            {
              loading ? (
                <div id="cover-spin" ></div>
              ) : (
                <div style={{ display: "none" }}></div>
              )}

            {Array.isArray(hotdeal) &&
              hotdeal.map((e) => (
                <div key={e.banner?.id}>
                  <Link to={`/view-all-products`}>
                    <img
                      src={e.banner?.original_url}
                      className="img-fluid mx-auto"
                      alt="super-deal"
                      width="100%"
                    />
                  </Link>
                </div>
              ))}
          </div>

          {/* mobile */}
          <div className="mobile">
          {
              loading ? (
                <div id="cover-spin" ></div>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
            {Array.isArray(hotdeal) &&
              hotdeal.map((e) => (
                <div className="byoc" key={e.mobile_banner?.id}>
                  <Link to={`/view-all-products`}>
                    <img
                      src={e.mobile_banner?.original_url}
                      className="img-fluid"
                      width="100%"
                      alt="super-deal"
                    />
                  </Link>
                </div>
              ))}
          </div>
          <div className="mb-1 mt-3 text-center">
            <img
              src="assets/img/mobikwik.png"
              alt="mobikwik-Logo"
              width="80%"
              height="auto"
            />
          </div>
          <div className="byocc mt-4 text-center">
            <img src="/assets/img/byoc.png" alt="byoc-img" />
          </div>
          <hr />
        </div>
        <div className="container mt-0 mb-5">
          <div className="row">
            <div className=" col-md-6" style={{ marginTop: "1rem" }}>
              <h1>Build Your Combo From Products Below</h1>
            </div>
            <div className="col-md-6"></div>
          </div>



          <div className="row">

            {products.map((e) => (

              <div className="col-lg-3 col-md-3" key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
                    <Link className="addtofavCategory">
                      <i
                        className="bi bi-heart"
                        style={{
                          position: "absolute",
                          right: ".8rem",
                          top: ".5rem",
                        }}
                      ></i>
                    </Link>
                    <Link to={`/product/${e.id}`}>
                      <img src={e.thumbnail_img?.original_url} alt="img"></img>
                    </Link>
                  </div>

                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name.substring(0, 40)}</span>
                    </div>
                    {/* <div>
                      <span className="packof">(Pack of 2)</span>
                    </div> */}
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="spSingleProduct">
                          ₹{e.selling_price}
                        </span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <div className="btn_atc">
                        <i
                          className="bi bi-cart"
                          id={e.id}
                          style={{ cursor: "pointer" }}
                        >
                          Add to Cart
                        </i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
        <div className="container mb-4">
          <nav aria-label="Page navigation example" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <div className="desktop">
              page {pageNumber} of {totalPages}
            </div>

            <div>
              <ul className="pagination" style={{ justifyContent: "space-between", alignItems: "center" }}>
                <li className="page-item">
                  <Link className="page-link" tabindex="-1" onClick={handlePreviousClick}>Previous</Link>
                </li>
                <div className="numbers">
                  <li className="page-item"><Link className="page-number" style={{ border: "none" }} > {renderPageNumbers()}</Link></li>
                  {/* <li className="page-item"><Link className="page-link page-number" >2</Link></li>
                  <li className="page-item"><Link className="page-link page-number" >3</Link></li>
                  <li className="page-item"><Link className="page-link page-number" >3</Link></li>
                  <li className="page-item"><Link className="page-link page-number" >3</Link></li>
                  <li className="page-item"><Link className="page-link page-number" >3</Link></li> */}
                </div>
                <li className="page-item">
                  <Link className="page-link" onClick={handleNextClick}>Next</Link>
                </li>
              </ul>
            </div>

            <div></div>
          </nav>
        </div>
      </HomeLayout >
    </>
  );
};

export default MYOC;
