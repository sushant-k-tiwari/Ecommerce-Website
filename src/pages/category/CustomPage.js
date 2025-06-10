import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import HomeLayout from "../../layouts/HomeLayout";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./category.css";
import axios from "axios";
import { CgSortAz } from "react-icons/cg";
import { BiFilterAlt } from "react-icons/bi";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import {
  addCartProduct,
  getCartCount,
  getSubTotal,
  getTotalAmount,
  getTotalDiscount,
} from "../../components/features/useCartSlice";
import {
  singleaddCartProduct,
  getsingleCartCount,
  getsingleSubTotal,
  getsingleTotalAmount,
  getsingleTotalDiscount,
} from "../../components/features/SingleCartSlice";
import { fetchCategories } from "../../components/features/actions/categoriesActions";
import { fetchBrand } from "../../components/features/actions/brandActions";

const CustomPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [banner, setBanner] = useState([]);
  const [combo, setCombo] = useState([]);
  const [product, setProduct] = useState([]);
  const [filterCombo, setFilterCombo] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [checkedFilters, setCheckedFilters] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [brandId, setBrandId] = useState([]);
  const [categoriesId, setCategoriesId] = useState([]);

  // const {  banner ,combo,brandId,categoriesId} = useSelector((state) => state.pagedata);

  // useEffect(() => {
  //   dispatch(fetchPageproduct(id));
  // }, [dispatch,id]);

  // sort by low to high and high to low

  // const sortData = () => {
  //   const sortedData = [...combo].sort(
  //     (a, b) => b.selling_price - a.selling_price
  //   );
  //   const sortedDataProduct = [...product].sort(
  //     (a, b) => b.selling_price - a.selling_price
  //   );
  //   setCombo(sortedData);
  //   setBrandProduct(sortedDataProduct);
  // };

  // const lowtoHigh = () => {
  //   const sortedData = [...combo].sort(
  //     (a, b) => a.selling_price - b.selling_price
  //   );
  //   const sortedDataProducts = [...brandProduct].sort(
  //     (a, b) => a.selling_price - b.selling_price
  //   );
  //   setCombo(sortedData);
  //   setBrandProduct(sortedDataProducts);
  // };

  // API of custom page

  useEffect(() => {
    async function fetchData() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/page/${slug}`,
          options
        );
        setBanner(response.data);
        setCombo(response.data.combos);
        setProduct(response.data.product);
        setBrandId(response.data.brands);
        setCategoriesId(response.data.categories);
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

  // add to cart for combo

  let productObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
    slug: "",
  };
  const addToCart = (e) => {
    productObj = {
      id: e.id,
      slug: e.slug,
      title: e.name,
      price: e.selling_price,
      image: e.meta_img?.url,
      mrp: e.mrp,
      discount: e.discount,
    };

    dispatch(addCartProduct(productObj));
    dispatch(getCartCount());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
    dispatch(getTotalDiscount());
  };

  // add to cart single product

  let SingleproductObj = {
    id: "",
    title: "",
    price: "",
    image: "",
    mrp: "",
    discount: "",
    slug: "",
  };

  const addToSingleCart = (p) => {
    SingleproductObj = {
      id: p.id,
      slug: p.slug,
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

  // Categories

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  // Add To wishlist combo
  const user_id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  function wishlistData(id) {
    const data = {
      user_id: user_id,
      combo_id: id,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/addWishlist`, data, {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
      });
  }

  // Add to wishlist For product
  const [heartFilled, setHeartFilled] = useState(null);

  function wishlistProductData(id) {
    const data = {
      user_id: user_id,
      product_id: id,
    };

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/addWishlist`, data, {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          setHeartFilled(id);
          // setTimeout(() => setHeartFilled(null), 4000);
        } else {
          alert(res.data.message);
        }
      });
  }

  // total brands
  const { brand } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(fetchBrand());
  }, [dispatch]);

  const filterbrandsApi = brand.filter((e) => e.focused === "on");

  //  Brand by id
  // const { brandProduct,loading   } = useSelector(
  //   (state) => state.pagebrand
  // );

  // useEffect(() => {
  //   dispatch(fetchPagebrand(brandId));
  // }, [dispatch, brandId]);

  const [brandProduct, setBrandProduct] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      try {
        if (brandId) {
          const promises = brandId.map((e) =>
            axios.get(
              `${process.env.REACT_APP_BASE_URL}/brand/${e.slug}`,
              options
            )
          );
          const responses = await Promise.all(promises);
          const data = responses.map((response) => response.data.products.data);
          setIsLoading(false);

          setBrandProduct(data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(true);
    fetchProducts();
  }, [brandId]);

  // Categories id
  // const { categoriesCombo, categoriesProduct   } = useSelector(
  //   (state) => state.pagecategory
  // );

  // useEffect(() => {
  //   dispatch(fetchPagecategory(categoriesId));
  // }, [dispatch, categoriesId]);
  const [categoriesCombo, setCategoriesCombo] = useState([]);
  const [categoriesProduct, setCategoriesProduct] = useState([]);
  useEffect(() => {
    async function fetchProducts() {
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          mode: "cors",
          credentials: "include",
        },
      };
      try {
        if (categoriesId) {
          const promises = categoriesId.map((e) =>
            axios.get(
              `${process.env.REACT_APP_BASE_URL}/category/${e.slug}`,
              options
            )
          );
          const responses = await Promise.all(promises);
          const data = responses.map(
            (response) => response.data.data.combos.data
          );
          const productData = responses.map(
            (response) => response.data.data.products.data
          );

          setCategoriesProduct(productData);
          setCategoriesCombo(data);
          // setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setIsLoading(true);
    fetchProducts();
  }, [categoriesId]);

  // filteration

  const [filterPageCombo, setFilterPageCombo] = useState([]);
  const [filterPageBrand, setFilterPageBrand] = useState([]);
  const [filterPageCategoryCombo, setFilterPageCategoryCombo] = useState([]);
  const [filterPageCategoryProduct, setFilterPageCategoryProduct] = useState(
    []
  );
  const [priceRanges, setPriceRanges] = useState([
    { minPrice: 50, maxPrice: 499, label: "50-499", isVisible: true },
    { minPrice: 500, maxPrice: 999, label: "500-999", isVisible: true },
    { minPrice: 1000, maxPrice: 1999, label: "1000-1999", isVisible: true },
    { minPrice: 2000, maxPrice: 4999, label: "2000-4999", isVisible: true },
    { minPrice: 5000, maxPrice: 500000, label: "5000-500000", isVisible: true },
  ]);

  const handleFilter = (minPrice, maxPrice) => {
    const key = `${minPrice}-${maxPrice}`;

    if (checkedFilters[key]) {
      // If the filter is already checked, remove it
      const newFilters = { ...checkedFilters };
      delete newFilters[key];
      setCheckedFilters(newFilters);

      // Update the filtered products lists
      const newFilteredProducts1 = filterPageCombo.filter((product) => {
        const price = product.selling_price;
        return !(price >= minPrice && price <= maxPrice);
      });
      setFilterPageCombo(newFilteredProducts1);

      const newFilteredProducts2 = filterPageBrand.filter((product) => {
        const price = product.selling_price;
        return !(price >= minPrice && price <= maxPrice);
      });
      setFilterPageBrand(newFilteredProducts2);

      const newFilteredProducts3 = filterPageCategoryCombo.filter((product) => {
        const price = product.selling_price;
        return !(price >= minPrice && price <= maxPrice);
      });
      setFilterPageCategoryCombo(newFilteredProducts3);

      const newFilteredProducts4 = filterPageCategoryProduct.filter(
        (product) => {
          const price = product.selling_price;
          return !(price >= minPrice && price <= maxPrice);
        }
      );
      setFilterPageCategoryProduct(newFilteredProducts4);
    } else {
      // If the filter is not checked, add it
      setCheckedFilters({ ...checkedFilters, [key]: true });

      // Update the filtered products lists
      const filtered1 = combo.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });

      setFilterPageCombo((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered1,
      ]);

      const filtered2 = brandProduct.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });

      setFilterPageBrand((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered2,
      ]);
      const filtered3 = categoriesCombo.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });

      setFilterPageCategoryCombo((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered3,
      ]);

      const filtered4 = categoriesProduct.filter((product) => {
        const price = product.selling_price;
        return price >= minPrice && price <= maxPrice;
      });

      setFilterPageCategoryProduct((prevFilteredProducts) => [
        ...prevFilteredProducts,
        ...filtered4,
      ]);
    }
  };

  useEffect(() => {
    const updatePriceRangeVisibility = () => {
      const updatedPriceRanges = priceRanges.map((range) => {
        const { minPrice, maxPrice } = range;
        const hasComboProductsInRange = combo?.some(
          (product) =>
            product.selling_price >= minPrice &&
            product.selling_price <= maxPrice
        );
        const hasProductInRange = brandProduct?.some(
          (product) =>
            product.selling_price >= minPrice &&
            product.selling_price <= maxPrice
        );
        const hasCategorycomboInRange = categoriesCombo?.some(
          (product) =>
            product.selling_price >= minPrice &&
            product.selling_price <= maxPrice
        );
        const hasCategoryproductInRange = categoriesProduct?.some(
          (product) =>
            product.selling_price >= minPrice &&
            product.selling_price <= maxPrice
        );
        const isVisible =
          hasComboProductsInRange ||
          hasProductInRange ||
          hasCategorycomboInRange ||
          hasCategoryproductInRange;
        return { ...range, isVisible };
      });
      setPriceRanges(updatedPriceRanges);
    };

    updatePriceRangeVisibility();
  }, [brandProduct, categoriesCombo, categoriesProduct, combo]);

  // Collapse for filters ui
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };

  const [isOpen4, setIsOpen4] = useState(false);
  const handleToggle4 = () => {
    setIsOpen4(!isOpen4);
  };

  const [isOpen5, setIsOpen5] = useState(false);
  const handleToggle5 = () => {
    setIsOpen5(!isOpen5);
  };

  function handleClick(categoryId) {
    setFilteredProducts([]);
    setFilterCombo([]);
    setCheckedFilters(false);
    navigate(`/category/${categoryId}`);
  }

  function handleClickbrand(brandId) {
    setFilteredProducts([]);
    setFilterCombo([]);
    setCheckedFilters(false);
    navigate(`/brand/${brandId}`);
  }

  let section = null;
  if (combo && combo.length >= 1) {
    section = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />
        {filterPageCombo.length > 0
          ? filterPageCombo.map((e) => (
              <div className="col-md-4 " key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
                    <div
                      onClick={() => wishlistData(e.id)}
                      className="addtofavCategory"
                    >
                      <i
                        className="bi bi-heart"
                        style={{
                          position: "absolute",
                          right: "1rem",
                          top: ".8rem",
                        }}
                      ></i>
                    </div>
                    <Link to={`/combo/${e.slug}`}>
                      <img src={e.meta_img?.url} alt="img" width="100%"></img>
                    </Link>
                  </div>

                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name}</span>
                    </div>
                    <div>
                      <span className="packof">(Pack of 2)</span>
                    </div>
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="sp">₹{e.selling_price}</span>
                      </div>
                      <div className="col-4">
                        <del className="mrp">₹{e.mrp}</del>
                      </div>
                      <div className="col-4">
                        <span className="discount">{e.discount}% OFF</span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <div
                        className="btn_atc"
                        onClick={() => {
                          addToCart(e);
                          alert("product added to cart successfully");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="cartTextMob" id={e.id}>
                          Add to Cart
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : combo.map((e) => (
              <div className="col-md-4 " key={e.id}>
                <div className="newComboCart">
                  <div
                    className="cart-img-sec"
                    style={{ position: "relative" }}
                  >
                    <div
                      onClick={() => wishlistData(e.id)}
                      className="addtofavCategory"
                    >
                      <i
                        className="bi bi-heart"
                        style={{
                          position: "absolute",
                          right: "1rem",
                          top: ".8rem",
                        }}
                      ></i>
                    </div>
                    <Link to={`/combo/${e.slug}`}>
                      <img src={e.meta_img?.url} alt="img" width="100%"></img>
                    </Link>
                  </div>

                  <div className="card-det-sec">
                    <div className="headingCard pt-3">
                      <span>{e.name}</span>
                    </div>
                    <div>
                      <span className="packof">(Pack of){e.packqty}</span>
                    </div>
                    <div className="price-sec">
                      <div className="col-4" style={{ textAlign: "end" }}>
                        <span className="sp">₹{e.selling_price}</span>
                      </div>
                      <div className="col-4">
                        <del className="mrp">₹{e.mrp}</del>
                      </div>
                      <div className="col-4">
                        <span className="discount">{e.discount}% OFF</span>
                      </div>
                    </div>
                    <div className="card-btn-sec ">
                      <div
                        className="btn_atc"
                        onClick={() => {
                          addToCart(e);
                          alert("product added to cart successfully");
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p className="cartTextMob" id={e.id}>
                          Add to Cart
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </>
    );
  }

  let categoriesComboSection = null;
  if (categoriesCombo && categoriesCombo.length >= 1) {
    categoriesComboSection = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />

        {categoriesCombo.map((subArray) => {
          if (subArray.length > 0) {
            return (
              <>
                {subArray.map((p) => (
                  <div className="col-md-4" key={p.id}>
                    <div className="newComboCart">
                      <div
                        className="cart-img-sec"
                        style={{ position: "relative" }}
                      >
                        <Link
                          onClick={() => wishlistProductData(p.id)}
                          className="addtofavCategory"
                        >
                          <ul>
                            <li className="youMayLikeHeart">
                              {heartFilled === p.id ? (
                                <i
                                  style={{ color: "#fe9e2d" }}
                                  className="bi bi-heart-fill"
                                ></i>
                              ) : (
                                <i className="bi bi-heart"></i>
                              )}
                            </li>
                          </ul>
                        </Link>
                        <Link to={`/product/${p.slug}`}>
                          <img
                            src={p.meta_img?.url}
                            alt={p.name}
                            width="100%"
                          ></img>
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3 ">
                          {/* <span>{p.name.substring(0, 40)}</span> */}
                          {p.name && <span>{p.name.substring(0, 40)}</span>}
                        </div>
                        <div>
                          <span className="packof">(Pack of 2)</span>
                        </div>
                        <div className="price-sec">
                          <span className="spSingleProduct">
                            ₹{p.selling_price}
                          </span>
                        </div>
                        <div className="card-btn-sec ">
                          <div
                            className="btn_atc"
                            onClick={() => {
                              addToSingleCart(p);
                              alert("product added to cart successfully");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <p className="cartTextMob" id={p.id}>
                              Add to Cart
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }

  let categoriesProductSection = null;
  if (categoriesProduct.length >= 1) {
    categoriesProductSection = (
      <>
        {/* section content */}
        <hr />
        <div className="pre">
          <h3>Precurated Combo</h3>
        </div>
        <hr />

        {categoriesProduct.map((subArray) => {
          if (subArray.length > 0) {
            return (
              <>
                {subArray.map((p) => (
                  <div className="col-md-4" key={p.id}>
                    <div className="newComboCart">
                      <div
                        className="cart-img-sec"
                        style={{ position: "relative" }}
                      >
                        <Link
                          onClick={() => wishlistProductData(p.id)}
                          className="addtofavCategory"
                        >
                          <ul>
                            <li className="youMayLikeHeart">
                              {heartFilled === p.id ? (
                                <i
                                  style={{ color: "#fe9e2d" }}
                                  className="bi bi-heart-fill"
                                ></i>
                              ) : (
                                <i className="bi bi-heart"></i>
                              )}
                            </li>
                          </ul>
                        </Link>
                        <Link to={`/product/${p.slug}`}>
                          <img
                            src={p.thumbnail_img?.original_url}
                            alt={p.name}
                            width="100%"
                          ></img>
                        </Link>
                      </div>

                      <div className="card-det-sec">
                        <div className="headingCard pt-3 ">
                          {/* <span>{p.name.substring(0, 40)}</span> */}
                          {p.name && <span>{p.name.substring(0, 40)}</span>}
                        </div>
                        <div>
                          <span className="packof">(Pack of 2)</span>
                        </div>
                        <div className="price-sec">
                          <span className="spSingleProduct">
                            ₹{p.selling_price}
                          </span>
                        </div>
                        <div className="card-btn-sec ">
                          <div
                            className="btn_atc"
                            onClick={() => {
                              addToSingleCart(p);
                              alert("product added to cart successfully");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <p className="cartTextMob" id={p.id}>
                              Add to Cart
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            );
          } else {
            return null;
          }
        })}
      </>
    );
  }

  return (
    <>
      <HomeLayout>
        <div className="mobile">
          <div
            className="d-flex fixed-bottom bg-light"
            style={{
              textAlign: "center",
              fontSize: "16px",
              height: "40px",
              alignItems: "center",
            }}
          >
            <div className="col-6" style={{ borderRight: "1px solid #464646" }}>
              <div
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasLeft"
                aria-controls="offcanvasRight"
              >
                {" "}
                <CgSortAz /> Sort By
              </div>

              <div
                className="offcanvas offcanvas-bottom"
                tabIndex="-1"
                id="offcanvasLeft"
                aria-labelledby="offcanvasLeftLabel"
                style={{ height: "80%" }}
              >
                <div className="offcanvas-header">
                  <h1 id="offcanvasLeftLabel">Sort By</h1>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <hr />
                <div
                  className="offcanvas-body"
                  style={{
                    textAlign: "left",
                    lineHeight: "2",
                    marginTop: "20px",
                  }}
                >
                  <ul className="filterul">
                    <li>Name</li>
                    <li>Category</li>
                    <li>MRP</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                {" "}
                <BiFilterAlt /> Filter
              </div>

              <div
                className="offcanvas offcanvas-bottom"
                tabIndex="-1"
                id="offcanvasRight"
                aria-labelledby="offcanvasRightLabel"
                style={{ height: "80%" }}
              >
                <div className="offcanvas-header">
                  <h1 id="offcanvasRightLabel">Filter</h1>
                  <button
                    type="button"
                    className="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  ></button>
                </div>
                <hr />
                <div className="offcanvas-body" style={{ textAlign: "left" }}>
                  <div>
                    <h5
                      variant="primary"
                      onClick={handleToggle4}
                      aria-controls="collapseExample"
                      // aria-expanded={isOpen4}
                    >
                      Category
                      {isOpen4 ? (
                        <TfiAngleUp
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      ) : (
                        <TfiAngleDown
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      )}
                    </h5>

                    <Collapse in={isOpen4}>
                      <div id="collapseExample">
                        <div style={{ margin: "10px 5px 5px 5px" }}>
                          {categories.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id={e.name}
                                className="form-check-input"
                                onClick={() => handleClick(e.id)}
                              />

                              <label
                                className="form-check-label"
                                htmlFor={e.name}
                              >
                                {e.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Collapse>
                  </div>

                  <div>
                    <h5
                      variant="primary"
                      onClick={handleToggle5}
                      aria-controls="collapseExample"
                      // aria-expanded={isOpen5}
                    >
                      Price
                      {isOpen5 ? (
                        <TfiAngleUp
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      ) : (
                        <TfiAngleDown
                          style={{ position: "absolute", right: "1rem" }}
                        />
                      )}
                    </h5>

                    <Collapse in={isOpen5}>
                      <div id="collapseExample">
                        <div style={{ margin: "10px 5px 5px 5px" }}>
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="50-499"
                            >
                              50-499
                            </label>
                            <input
                              style={{ marginLeft: "7rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={!!checkedFilters["50-499"]}
                              onChange={() => handleFilter(50, 499)}
                              id="50-499"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="500-999"
                            >
                              500-999
                            </label>
                            <input
                              style={{ marginLeft: "6.45rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={!!checkedFilters["500-999"]}
                              onChange={() => handleFilter(500, 999)}
                              id="500-999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="1000-1999"
                            >
                              1000-1999
                            </label>
                            <input
                              style={{ marginLeft: "5.88rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={!!checkedFilters["1000-1999"]}
                              onChange={() => handleFilter(1000, 1999)}
                              id="1000-1999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="2000-4999"
                            >
                              2000-4999
                            </label>
                            <input
                              style={{ marginLeft: "5.34rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={!!checkedFilters["2000-4999"]}
                              onChange={() => handleFilter(2000, 4999)}
                              id="2000-4999"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              htmlFor="5000 & Above"
                            >
                              5000 & Above
                            </label>
                            <input
                              style={{ marginLeft: "3.963rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={!!checkedFilters["5000-500000"]}
                              onChange={() => handleFilter(5000, 500000)}
                              id="5000 & Above"
                            />
                          </div>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-3 desktop">
              <div style={{ marginTop: "2rem" }}>
                <div className="card" style={{ padding: "0" }}>
                  <div className="card-body">
                    Sort By:{" "}
                    <span style={{ color: "#FE9E2D" }}>Popularity</span>
                  </div>
                </div>
                <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                  <div className="sortBy">
                    <label className="form-check-label" for="flexCheckDefault">
                      Popularity
                    </label>
                    <input
                      style={{ marginLeft: "11.95rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label className="form-check-label" for="flexCheckDefault">
                      Discount
                    </label>
                    <input
                      style={{ marginLeft: "12.6rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label className="form-check-label" for="flexCheckDefault">
                      Name
                    </label>
                    <input
                      style={{ marginLeft: "13.9rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label className="form-check-label" for="flexCheckDefault">
                      Customer Top Rated
                    </label>
                    <input
                      style={{ marginLeft: "6.6rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label className="form-check-label" for="flexCheckDefault">
                      New Arrivals
                    </label>
                    <input
                      style={{ marginLeft: "10.8rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label className="form-check-label" for="flexCheckDefault">
                      Price: High to Low
                    </label>
                    <input
                      style={{ marginLeft: "8.3rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>

                  <div>
                    <label className="form-check-label" for="flexCheckDefault">
                      Price: Low to High
                    </label>
                    <input
                      style={{ marginLeft: "8.3rem" }}
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">Filter By</div>
                <div className="card-body">
                  <div id="accordionExample">
                    <div className="accordion-item mb-2">
                      <div
                        className="row align-items-center"
                        variant="primary"
                        onClick={handleToggle1}
                        aria-controls="collapseExample"
                        aria-expanded={isOpen1}
                      >
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Categories
                        </h6>

                        <RiArrowDropDownLine
                          className="col-3 "
                          style={{
                            fontSize: "30px",
                            backgroundColor: "#FFF",
                            color: "#464646",
                          }}
                        />
                      </div>

                      <Collapse in={isOpen1}>
                        <div id="collapseExample">
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          {categories.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                // id={`category_id${category.id}`}
                                // defaultValue={category.id}
                                className="form-check-input"
                                onClick={() => handleClick(e.id)}
                              />

                              <label className="form-check-label">
                                {e.name} (106)
                              </label>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    </div>

                    <div className="accordion-item mb-2">
                      <div
                        className="row align-items-center"
                        variant="primary"
                        onClick={handleToggle2}
                        aria-controls="collapseExample"
                        aria-expanded={isOpen2}
                      >
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Brand
                        </h6>

                        <RiArrowDropDownLine
                          className="col-3 text-end"
                          style={{
                            fontSize: "30px",
                            backgroundColor: "#FFF",
                            color: "#464646",
                          }}
                        />
                      </div>

                      <Collapse in={isOpen2}>
                        <div id="collapseExample">
                          {filterbrandsApi.map((e) => (
                            <div className="form-check" key={e.id}>
                              <input
                                type="radio"
                                name="category_id"
                                id={e.name}
                                onchange="event.preventDefault(document.getElementById('filterForm103').submit());"
                                className="form-check-input"
                                onClick={() => handleClickbrand(e.id)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor={e.name}
                              >
                                {e.name} (51)
                              </label>
                            </div>
                          ))}
                        </div>
                      </Collapse>
                    </div>

                    <div className="accordion-item mb-2">
                      <div
                        className="row align-items-center"
                        variant="primary"
                        onClick={handleToggle3}
                        aria-controls="collapseExample"
                        aria-expanded={isOpen3}
                      >
                        <h6
                          className="col-9 mb-0 px-0"
                          style={{ backgroundColor: "#FFF", textAlign: "left" }}
                        >
                          Price
                        </h6>

                        <RiArrowDropDownLine
                          className="col-3"
                          style={{
                            fontSize: "30px",
                            backgroundColor: "#FFF",
                            color: "#464646",
                          }}
                        />
                      </div>

                      <Collapse in={isOpen3}>
                        <div id="collapseExample">
                          <input
                            type="hidden"
                            name="_token"
                            defaultValue="uBsUNvaRvvXcIHGdYxLZYD6MSJAGnnqBe7BvE1ah"
                          />{" "}
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              50-499
                            </label>
                            <input
                              style={{ marginLeft: "7rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["50-499"]}
                              onChange={() => handleFilter(50, 499)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              500-999
                            </label>
                            <input
                              style={{ marginLeft: "6.45rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["500-999"]}
                              onChange={() => handleFilter(500, 999)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              1000-1999
                            </label>
                            <input
                              style={{ marginLeft: "5.88rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["1000-1999"]}
                              onChange={() => handleFilter(1000, 1999)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              2000-4999
                            </label>
                            <input
                              style={{ marginLeft: "5.34rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["2000-4999"]}
                              onChange={() => handleFilter(2000, 4999)}
                              id="flexCheckDefault"
                            />
                          </div>
                          <div className="sortBy">
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              5000 & Above
                            </label>
                            <input
                              style={{ marginLeft: "3.963rem" }}
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              checked={checkedFilters["5000-500000"]}
                              onChange={() => handleFilter(5000, 500000)}
                              id="flexCheckDefault"
                            />
                          </div>
                        </div>
                      </Collapse>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-9 ">
              {isLoading && <div id="cover-spin"></div>}

              {/* {isLoading ? (
                  <div id="cover-spin"></div>
                ) : (
                  <div style={{ display: "none" }}></div>
                )} */}
              <div className="banner" key={banner.id}>
                <img src={banner.thumbnail?.url} width="100%" alt="baner" />
              </div>

              <div className="row">
                <nav>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link>Categories</Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link className="categoriesName">{banner.name}</Link>
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="row" style={{ marginTop: "3rem" }}>
                <div className="col-md-6">
                  <h4>
                    <strong>Top Trending</strong>
                  </h4>
                </div>
                {/* <div className="col-md-6" style={{ textAlign: "end" }}>
                    <div className="" style={{}}>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant=""
                          id="dropdown-basic"
                          style={{
                            border: "1px solid",
                            marginLeft: "3rem",
                            width: "120px",
                          }}
                        >
                          Sort by
                        </Dropdown.Toggle>
    
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={lowtoHigh}>
                            low to High
                          </Dropdown.Item>
                          <Dropdown.Item onClick={sortData}>
                            High to low
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div> */}
              </div>

              <div className="row" style={{ marginTop: "1rem" }}>
                {/* Combo products */}
                {section}
                {/* Categories combo secetion */}
                {categoriesComboSection}
                <hr />
                <div className="byocc">
                  <h3>Bulid Your Own Combo</h3>
                  <img src="/assets/img/byoc.png" alt="byoc-img" />
                </div>
                <hr />
                {/* Single Products */}
                {brandProduct.map((subArray) => {
                  if (subArray.length > 0) {
                    return (
                      <>
                        {subArray.map((p) => (
                          <div className="col-md-4" key={p.id}>
                            <div className="newComboCart">
                              <div
                                className="cart-img-sec"
                                style={{ position: "relative" }}
                              >
                                <Link
                                  onClick={() => wishlistProductData(p.id)}
                                  className="addtofavCategory"
                                >
                                  <ul>
                                    <li className="youMayLikeHeart">
                                      {heartFilled === p.id ? (
                                        <i
                                          style={{ color: "#fe9e2d" }}
                                          className="bi bi-heart-fill"
                                        ></i>
                                      ) : (
                                        <i className="bi bi-heart"></i>
                                      )}
                                    </li>
                                  </ul>
                                </Link>
                                <Link to={`/product/${p.slug}`}>
                                  <img
                                    src={p.thumbnail_img?.original_url}
                                    alt={p.name}
                                    width="100%"
                                  ></img>
                                </Link>
                              </div>

                              <div className="card-det-sec">
                                <div className="headingCard pt-3 ">
                                  {/* <span>{p.name.substring(0, 40)}</span> */}
                                  {p.name && (
                                    <span>{p.name.substring(0, 40)}</span>
                                  )}
                                </div>
                                <div>
                                  <span className="packof">(Pack of 2)</span>
                                </div>
                                <div className="price-sec">
                                  <span className="spSingleProduct">
                                    ₹{p.selling_price}
                                  </span>
                                </div>
                                <div className="card-btn-sec ">
                                  <div
                                    className="btn_atc"
                                    onClick={() => {
                                      addToSingleCart(p);
                                      alert(
                                        "product added to cart successfully"
                                      );
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p className="cartTextMob" id={p.id}>
                                      Add to Cart
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    );
                  } else {
                    return null;
                  }
                })}{" "}
                {/* Categories single Product */}
                {categoriesProductSection}
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
};

export default CustomPage;
