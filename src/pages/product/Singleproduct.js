import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./product.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import HomeLayout from "../../layouts/HomeLayout";
// import SimilarProduct from "./SimilarProduct";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  // InstapaperShareButton,
} from "react-share";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { useDispatch } from "react-redux";

const Singleproduct = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [product, setProduct] = useState([]);
  const [productimg, setProductimg] = useState([]);
  const [error, setError] = useState(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if the window width is less than or equal to 768px
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        setShowOffcanvas(false);
      } else {
        setIsMobile(false);
      }
    };

    // Check on initial mount
    handleResize();

    // Attach an event listener to the window resize event
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/product/${slug}`,
          options
        );
        setProduct(response.data.products);
        setProductimg(response.data.products.photos);
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
    }
    fetchData();
  }, [slug]);

  if (error) {
    console.log(error);
  }

  // Add to cart single brand products

  let SingleproductObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
  };

  const addToSingleCart = (p) => {
    SingleproductObj = {
      id: p.id,
      title: p.name,
      price: p.selling_price,
      image: p.thumbnail_img?.original_url,
      mrp: p.mrp,
      discount: p.discount,
    };

    dispatch(singleaddCartProduct(SingleproductObj));
    dispatch(getsingleCartCount());
    dispatch(getsingleSubTotal());
    dispatch(getsingleTotalAmount());
    dispatch(getsingleTotalDiscount());
  };

  const [showShareOption, setShowShareOption] = useState(false);
  const ShareOption = () => {
    const pageUrl = `${window.location.origin}/combo/${slug}`;

    const sharingOptions = {
      title: "Page Title",
      url: pageUrl,
    };

    return (
      <>
        <div className="desktop">
          <div
            style={{
              backgroundColor: "white",
              color: "#464646",
              display: "flex",
              width: "265px",
              height: "80px",
              justifyContent: "",
              marginTop: "10px",
              marginLeft: "10px",
              padding: "5px",
              paddingTop: "10px",
              boxShadow: "0 4px 16px 0 rgba(0,0,0,.2)",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "8px",
                margin: "0 12px 10px 5px",
              }}
            >
              <FacebookShareButton url={sharingOptions.url}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <br />
              <p style={{ fontSize: "12px" }}>FaceBook</p>
            </div>

            <div
              style={{
                display: "inline-block",
                padding: "8px",
                margin: "0 12px 10px 5px",
              }}
            >
              <TwitterShareButton url={sharingOptions.url}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <p style={{ fontSize: "12px" }}>Twitter</p>
            </div>

            <div
              style={{
                display: "inline-block",
                padding: "8px",
                margin: "0 12px 10px 5px",
              }}
            >
              <WhatsappShareButton url={sharingOptions.url}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
              <p style={{ fontSize: "12px" }}>WhatsApp</p>
            </div>

            {/* <InstapaperShareButton url={sharingOptions.url}>

        </InstapaperShareButton> */}
          </div>
        </div>
      </>
    );
  };

  const ShareOptionMobile = ({ showOffcanvas, handleCloseOffcanvas }) => {
    const pageUrl = `${window.location.origin}/product/${slug}`;

    const sharingOptions = {
      title: "Page Title",
      url: pageUrl,
    };

    return (
      <>
        <div className="mobile">
          <Offcanvas
            show={showOffcanvas}
            onHide={handleCloseOffcanvas}
            placement="bottom"
            style={{ height: "35%" }}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Share</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div
                className="row bg-light"
                style={{ height: "70px", padding: "10px" }}
              >
                <div className="col-2" style={{ overflow: "hidden" }}>
                  <img
                    src={product.thumbnail_img?.original_url}
                    style={{ width: "100%", height: "100%" }}
                    alt="ProductImg"
                  />
                </div>
                <div className="col-10">{product.name}</div>
              </div>

              <div className="row" style={{ marginTop: "20px" }}>
                <div
                  className="col-3"
                  style={{ padding: "0 10px 0 10px", textAlign: "center" }}
                >
                  <i className="bi bi-link" style={{ fontSize: "26px" }}></i>
                  <br />
                  Copy Link
                </div>

                <div className="col-3" style={{ textAlign: "center" }}>
                  <FacebookShareButton url={sharingOptions.url}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>
                  FaceBook
                </div>
                <div className="col-3" style={{ textAlign: "center" }}>
                  <TwitterShareButton url={sharingOptions.url}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>
                  Twitter
                </div>
                <div className="col-3" style={{ textAlign: "center" }}>
                  <WhatsappShareButton url={sharingOptions.url}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>
                  WhatsApp
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </>
    );
  };

  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleButtonClickMobile = () => {
    setShowOffcanvas(true);
  };

  const handleCloseOffcanvasMobile = () => {
    setShowOffcanvas(false);
  };

  const handleShareButtonClick = () => {
    // If the share option is already open, close it
    if (showShareOption) {
      setShowShareOption(false);
    } else {
      // Fetch product details and open the share option

      setShowShareOption(true);
    }
  };

  return (
    <div>
      <HomeLayout>
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-6">
              <div className="product-car">
                <Carousel
                  className="big-img-carousel "
                  centerMode={false}
                  infiniteLoop={true}
                  showArrows={false}
                >
                  <div
                    className="item big-img"
                    data-hash="one"
                    key={product.id}
                  >
                    <img
                      src={product.thumbnail_img?.original_url}
                      alt="name"
                      className=""
                      width="100%"
                    />
                  </div>

                  {productimg.map((e) => (
                    <div className="item big-img" data-hash="two">
                      <img
                        src={e.original_url}
                        alt="name"
                        className=""
                        width="100%"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            <div className="col-md-6" key={product.id}>
              <div className="breadcrumb mt-0 mb-0">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      <Link to="#">Product</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      <Link to="#">{product.name}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="heading">
                <h1>{product.name}</h1>
              </div>
              {/* <div className="quantity">
                <span>()</span>
              </div> */}
              <div
                className="productIconDiv"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <div
                  className="desktop"
                  style={{
                    backgroundColor: "#fe9e2d",
                    color: "white",
                    borderRadius: "100%",
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    paddingTop: "1px",
                  }}
                >
                  <i
                    onClick={handleShareButtonClick}
                    // data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"
                    className="bi bi-upload"
                    style={{ fontSize: "18px" }}
                  >
                    {showShareOption && <ShareOption />}
                  </i>
                </div>

                <div
                  className="mobile"
                  style={{
                    backgroundColor: "#fe9e2d",
                    color: "white",
                    borderRadius: "100%",
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    paddingTop: "1px",
                  }}
                >
                  <i
                    onClick={handleButtonClickMobile}
                    // data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom"
                    className="bi bi-upload"
                    style={{ fontSize: "18px" }}
                  ></i>
                </div>

                {isMobile && showOffcanvas && (
                  <ShareOptionMobile
                    showOffcanvas={showOffcanvas}
                    handleCloseOffcanvas={handleCloseOffcanvasMobile}
                  />
                )}

                <div
                  style={{
                    backgroundColor: "#fe9e2d",
                    color: "white",
                    borderRadius: "100%",
                    width: "30px",
                    height: "30px",
                    marginLeft: "20px",
                    textAlign: "center",
                    textAlignLast: "center",
                    paddingTop: "4px",
                  }}
                >
                  <i
                    className="bi bi-heart"
                    style={{ margin: "auto", fontSize: "18px" }}
                  ></i>
                </div>
                {/* <i class="bi bi-heart " style={{ marginLeft: "20px"}}></i> */}
              </div>
              <div className="ratings">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star"></i>
                <i className="bi bi-star"></i>
                <span>8 Reviews</span>
              </div>
              <div className="location">
                <span>
                  <Link to="">
                    <i className="bi bi-geo-alt-fill"></i>
                    Select delivery location
                  </Link>
                </span>
              </div>
              <div className="basic-details">
                <span>Sold By:</span>
                <span className="sold-by">
                  {" "}
                  Born Unicorn Tech Prise Pvt. Ltd.
                </span>
                <br />
                <span>MRP:</span>
                <del className="mrp">₹{product.mrp}</del>
                <br />
                <span>Deal Price:</span>
                <span className="sp">₹{product.selling_price}</span>
                <br />
                <span>You Save:</span>
                <span className="youSave">
                  ₹150 <strong>({product.discount}%)</strong>
                </span>
                <br />
                <span className="priceinc">Price inclusive of all taxes</span>
              </div>
              <div className="cart">
                {/* <div className="d-flex">
                  <div className="" style={{ marginRight: "2rem" }}>
                    <span className="quant">Quantity:</span>
                  </div>
                  <div className="mod-cart d-flex">
                    <form action="" method="POST">
                      <button className="bi bi-trash-fill"></button>
                    </form>
                    <input
                      type="number"
                      value="1"
                      min="1"
                      max="10"
                      name="quantity"
                      className="cart-quant"
                    />
                    <form action="" method="POST">
                      <button className="bi bi-plus-lg"></button>
                    </form>
                  </div>
                </div>
                <br /> */}
                <div className="addCart col-4" id={product.id}>
                  <Link
                    to=""
                    onClick={() => {
                      addToSingleCart(product);
                    }}
                  >
                    <div className="btn_atc">
                      <i className="bi bi-cart"></i>Add To Cart
                    </div>
                  </Link>
                </div>
                {/* <br /> */}
                <div className="wishlist-sec">
                  <i className="bi bi-heart"></i>
                  <Link to="#" className="wishlist">
                    Add To Wishlist
                  </Link>
                </div>
              </div>

              <div className="coupon-sec text-center mb-3">
                <img
                  src="../assets/img/usps.svg"
                  alt="img-fluid"
                  className="img-fluid"
                  width="100%"
                />
              </div>
              {/* <div className="coupon-sec text-center">
                <div className="coupon-card">
                  <div className="card-head">
                    <div className="tag">
                      <i className="bi bi-tag-fill"></i>
                    </div>
                    <div className="det">
                      <span className="use">Use Code</span>
                      <br />
                      <span className="code">COMBO50</span>
                    </div>
                  </div>
                  <div className="vl"></div>
                  <div className="card-body">
                    <div className="offer">
                      <span>Get it for</span>{" "}
                      <span className="price">₹ 299</span>
                    </div>
                    <div className="terms">
                      <p>Get Upto ₹50 Off on XXX and above Max Discount ₹XX</p>
                    </div>
                  </div>
                </div>
                <div className="more-card my-5">
                  <Link to="">+ 10 More</Link>
                </div>
              </div> */}
            </div>
            <div className="row pb-3">
              <div className="col-md-6">
                <img
                  src="../assets/img/slabs-freebies.png"
                  alt="img-fluid"
                  className="img-fluid"
                />
              </div>
              <div className="col-md-6">
                <img
                  src="../assets/img/slabs-tnc.png"
                  alt="img-fluid"
                  className="img-fluid"
                  width="100%"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="desc-sec my-5">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                  >
                    Manufacturer Details
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="contact-tab-pane"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <div className="tab-content my-5" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex="0"
                >
                  <ul className="combo-product">
                    <div
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                    {/* <li>Organic Harvest Strwberry Lip Balm - Velvet Red 3 g</li>
                    <li>Coloressence Britone Cleanse Moisture</li>
                    <li>Organic Harvest Diamond Shine</li> */}
                  </ul>
                  {/* <div>
                    <p>{product.desc}</p>
                  </div> */}
                </div>
                <div
                  className="tab-pane fade"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex="0"
                >
                  <div className="row">
                    <div className="col-6">
                      <ul className="det-list">
                        <li>
                          <span className="title">Brand :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Falvour :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Weight :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Country of Origin :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">FSSAI :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul className="det-list">
                        <li>
                          <span className="title">Package Weight :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Package Type :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Region :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">expriy Date :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                        <li>
                          <span className="title">Brand :</span>
                          <span className="value">XXXXXX</span>
                        </li>
                      </ul>
                    </div>
                    <div className="col-12 d-flex">
                      <strong>Note : </strong>{" "}
                      <p>
                        Product Images May Vary And Are Subject To Change From
                        Time To Time
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="contact-tab-pane"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                  tabIndex="0"
                >
                  <h2>
                    Reviews <i className="bi bi-chevron-down"></i>
                  </h2>
                  <div className="review-card d-flex">
                    <div className="img-sec text-center d-grid">
                      <img
                        src="assets/img/product/small.png"
                        alt=""
                        width="100%"
                      />
                      <span>Gwalesh Singh</span>
                    </div>
                    <div className="card-body text-left">
                      <h3>Worth Buying this Combo</h3>
                      <div className="ratings">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <span className="rat"> 5</span> /{" "}
                        <span>5 | 27th April 2022</span>
                      </div>
                      <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Incidunt vitae, odit praesentium, suscipit
                        molestias aperiam maiores facere quasi consectetur
                        dolorum eveniet? Laudantium est quaerat numquam natus,
                        explicabo neque eos voluptates voluptatibus molestiae
                        aperiam esse culpa eius earum id repudiandae facere
                        dolore cupiditate ex totam aliquam aut fuga fugiat
                        libero assumenda. Quod blanditiis maiores, nisi fugiat a
                        perferendis est molestias sint voluptate officiis
                        repellendus autem dolore numquam molestiae earum
                        temporibus ducimus.
                      </p>
                      <div className="rev-img-sec">
                        <img
                          src="assets/img/review-img.png"
                          alt=""
                          width="100%"
                        />
                        <img
                          src="assets/img/review-img.png"
                          alt=""
                          width="100%"
                        />
                        <img
                          src="assets/img/review-img.png"
                          alt=""
                          width="100%"
                        />
                        <img
                          src="assets/img/review-img.png"
                          alt=""
                          width="100%"
                        />
                      </div>
                      <div className="likes my-3">
                        <i className="bi bi-hand-thumbs-up"></i> 5
                        <i className="bi bi-hand-thumbs-down"></i> 4
                      </div>
                    </div>
                  </div>

                  <div className="row text-center">
                    <div className="col">
                      <Link to="" className="add-review-button">
                        <i className="bi bi-plus"></i> Add Reviews
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row ">
            <div className="top-trending">
              <div className="top-trending-head text-center">
                <h3 className="hr-line-head">
                  Explore more from Across the Store
                </h3>
              </div>
            </div>

            <SimilarProduct id={product.id} />
          </div> */}
        </div>
      </HomeLayout>
    </div>
  );
};

export default Singleproduct;
