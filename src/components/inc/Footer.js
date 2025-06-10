import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./incAll.css";
import { Collapse } from "react-bootstrap";
import { FiHome, FiHeadphones } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/actions/categoriesActions";
import { TfiAngleDown, TfiAngleUp } from "react-icons/tfi";
import { AiOutlineArrowUp } from "react-icons/ai"

const Footer = () => {

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  const handleToggle1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };
  const handleToggle3 = () => {
    setIsOpen3(!isOpen3);
  };
  const handleToggle4 = () => {
    setIsOpen4(!isOpen4);
  };

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* Desktop Footer */}
      <footer
        className="desktop"
        style={{ maxWidth: "100vw", overflowX: "hidden", background: "#000" }}
      >
        <div className="container">
          <div className="row" id="collapseFooter">
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_1">Quick Links</h3>
              <div className="collapse dont-collapse-sm links" id="collapse_1">
                <ul>
                  <li>
                    <Link to="/page/about-us">About us</Link>
                  </li>
                  <li>
                    <Link
                      to="/help"
                    >
                      Help
                    </Link>
                  </li>
                  <li>
                    <Link to="/">My account</Link>
                  </li>
                  <li>
                    <Link to="/">Contacts</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_2">Categories</h3>
              <div className="collapse dont-collapse-sm links" id="collapse_2">
                <ul>
                  {categories.map((e) => (
                    <li key={e.id}>
                      <Link onClick={handleClick} className="dropdown-item" to={`/category/${e.slug}`}>
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_3">Contacts</h3>
              <div
                className="collapse dont-collapse-sm contacts"
                id="collapse_3"
              >
                <ul>
                  <li className="row">
                    <i
                      className="bi bi-phone-fill"
                      style={{ marginTop: ".5rem" }}
                    ></i>
                    <p>
                      Mobile: 9910722205 <br></br>
                      Whatsapp: 9910722205
                    </p>
                  </li>
                  <li>
                    <i
                      style={{ marginTop: ".5rem" }}
                      className="bi bi-envelope-fill"></i>
                    <Link
                      style={{ color: "#A2A2A2" }}
                      href="mailto:customercare@combonation.in"
                    >
                      customercare@combonation.in
                    </Link>
                  </li>
                  <li>
                    <i className="bi bi-geo-alt"></i>301-303, 3rd Floor,
                    <br />
                    Good Earth Business Bay,
                    <br />
                    Sector - 58,
                    <br />
                    Gurugram, Haryana - 122098 <br />
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3 data-target="#collapse_4">Keep in touch</h3>
              <div className="collapse dont-collapse-sm" id="collapse_4">
                <div id="newsletter">
                  <form>
                    <div className="form-group">
                      <input
                        type="email"
                        name="email"
                        id="email_newsletter"
                        className="form-control"
                        placeholder="Your email"
                      />
                    </div>
                  </form>
                </div>
                <div className="follow_us">
                  <h5>Follow Us</h5>
                  <ul>
                    <li><Link href="https://www.facebook.com/profile.php?id=100078539967313" target="_blank" rel="noreferrer"><i className="bi bi-facebook" style={{ fontSize: "30px" }}></i></Link></li>
                    <li><Link href="https://instagram.com/combonation_in" target="_blank" rel="noreferrer"><i className="bi bi-instagram" style={{ fontSize: "30px" }}></i></Link></li>
                    <li><Link href="https://www.linkedin.com/company/combo-nation/mycompany" target="_blank" rel="noreferrer"><i className="bi bi-linkedin" style={{ fontSize: "30px" }}></i></Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section id="footer-secondary">
          <div className="container">
            <div
              className="row add_bottom_25 p-5"
              style={{ alignItems: "baseline", position: "relative" }}
            >
              <div className="col-lg-6 col-md-12">
                <h3>Working Hours:</h3>
                <span>Mon-Fri: 10:00AM - 06:30PM | Sat-Sun Closed</span>
              </div>
              <div className="col-lg-6" style={{ textAlign: "end" }}>
                <ul className="additional_links">
                  <li>
                    <Link to="/page/terms-of-service">
                      Terms and conditions
                    </Link>
                  </li>
                  <li>
                    <Link to="/page/privacy-policy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/page/returns-and-refunds">
                      Returns And Refunds
                    </Link>
                  </li>
                  <li>
                    <span>
                      &#169; 2020-23 Combonation.in. <br /> Powered By Born Unicorn
                      Tech Prise Pvt. Ltd.
                    </span>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="col-md-6 ">
                <ul className="footer-selector clearfix mt-4">
                  <li>
                    <img
                      src="assets/img/cards_all.svg"
                      alt=""
                      width="198"
                      height="30"
                    />
                  </li>
                </ul>
              </div>
              <div
                className="col-md-6 desktop"
                style={{
                  width: "450px",
                  position: "absolute",
                  right: "2.2rem",
                  bottom: "52px",
                }}
              >
              </div>
            </div>
            <div className="fixed-bottom">
              <Link to="#">
                <div style={{ position: "absolute", right: "30px", bottom: "60px", backgroundColor: "#ebebeb", textAlign: "center", fontSize: "30px", color: "#464646", width: "50px", height: "50px", borderRadius: "50%" }}>
                  <AiOutlineArrowUp />
                </div>
              </Link>

              <div className="how-we-help" style={{ width: "280px",marginRight: "10px", alignItems: "center" }}>
                <i className="bi bi-headset"></i>
                <h5>How may we help you</h5>
              </div>
            </div>
          </div>
        </section>
      </footer>

      {/* Mobile Footer */}
      <footer
        className="mobile"
        style={{
          maxWidth: "100vw",
          overflowX: "hidden",
          paddingBottom: "15px",
          backgroundColor: "#000",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <h3
                variant="primary"
                onClick={handleToggle1}
                aria-controls="collapseExample"
              // aria-expanded={isOpen1}
              >
                Quick Links

                {isOpen1 ? <TfiAngleUp style={{ position: "absolute", right: "1rem" }} /> : <TfiAngleDown style={{ position: "absolute", right: "1rem" }} />}
              </h3>


              <Collapse in={isOpen1}>
                <div id="collapseExample">
                  <ul>
                    <li style={{ color: "#fff" }}>
                      <Link href="/page/about-us">About us</Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link
                        href="mailto:customercare@combonation.in"
                      >
                        Help
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="/user/home">My account</Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="/contact-us">Contacts</Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3
                variant="primary"
                onClick={handleToggle2}
                aria-controls="collapseExample"
              // aria-expanded={isOpen2}
              >
                Categories

                {isOpen2 ? <TfiAngleUp style={{ position: "absolute", right: "1rem" }} /> : <TfiAngleDown style={{ position: "absolute", right: "1rem" }} />}
              </h3>

              <Collapse in={isOpen2}>
                <div id="collapseExample">
                  {/* <ul>
                    <li style={{ color: "#fff" }}>
                      <Link href="https://www.combonation.in/category/baby-care-new">
                        Baby Care
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="https://www.combonation.in/category/beauty">
                        Beauty
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="https://www.combonation.in/category/gifts-new">
                        Gifts
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="https://www.combonation.in/category/health-and-wellness-new">
                        Health &amp; Wellness
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="https://www.combonation.in/category/home-and-kitchen-new">
                        Home &amp; Kitchen
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <Link href="https://www.combonation.in/category/personal-care-new">
                        Personal Care
                      </Link>
                    </li>
                  </ul> */}
                  <ul>
                    {categories.map((e) => (
                      <li key={e.id}>
                        <Link onClick={handleClick} className="dropdown-item" to={`/category/${e.slug}`}>
                          {e.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Collapse>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3
                variant="primary"
                onClick={handleToggle3}
                aria-controls="collapseExample"
              // aria-expanded={isOpen3}
              >
                Contacts

                {isOpen3 ? <TfiAngleUp style={{ position: "absolute", right: "1rem" }} /> : <TfiAngleDown style={{ position: "absolute", right: "1rem" }} />}
              </h3>

              <Collapse in={isOpen3}>
                <div id="collapseExample" style={{ color: "#fff" }}>
                  <ul>
                    <li style={{ color: "#fff" }}>
                      <FiHome />
                      <Link href style={{ marginLeft: "1rem" }}>
                        Suite No 301, Third Floor, Good Earth Business Bay,
                        Sector 58, Gurugram Haryana (122011)
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <FiHeadphones />
                      <Link
                        style={{ marginLeft: "1rem" }}
                        href="tel:+919910722205"
                      >
                        9910722205
                      </Link>
                    </li>
                    <li style={{ color: "#fff" }}>
                      <HiOutlineMail />
                      <Link
                        href="mailto:customercare@combonation.in"
                      >
                        Help
                      </Link>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </div>
            <div className="col-lg-3 col-md-6">
              <h3
                variant="primary"
                onClick={handleToggle4}
                aria-controls="collapseExample"
              // aria-expanded={isOpen4}
              >
                Keep In Touch

                {isOpen4 ? <TfiAngleUp style={{ position: "absolute", right: "1rem" }} /> : <TfiAngleDown style={{ position: "absolute", right: "1rem" }} />}
              </h3>

              <Collapse in={isOpen4}>
                <div id="collapseExample">
                  <div id="newsletter">
                    <form action="#">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          id="email_newsletter"
                          className="form-control"
                          placeholder="Your email"
                        />
                        <button type="submit" id="submit-newsletter">
                          <i className="ti-angle-double-right" />
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="follow_us">
                    <h5>Follow Us</h5>
                    <ul>
                      <li><Link href="https://www.facebook.com/profile.php?id=100078539967313" target="_blank" rel="noreferrer"><i className="bi bi-facebook" style={{ fontSize: "30px" }}></i></Link></li>
                      <li><Link href="https://instagram.com/combonation_in" target="_blank" rel="noreferrer"><i className="bi bi-instagram" style={{ fontSize: "30px" }}></i></Link></li>
                      <li><Link href="https://www.linkedin.com/company/combo-nation/mycompany" target="_blank" rel="noreferrer"><i className="bi bi-linkedin" style={{ fontSize: "30px" }}></i></Link></li>
                    </ul>
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
          {/* /row*/}
          <hr />
          <div className="row add_bottom_25">
            <div className="col-lg-6">
              <ul className="footer-selector clearfix">
                <li>
                  <div className="styled-select lang-selector">
                    <select>
                      <option defaultValue="English">English</option>
                    </select>
                  </div>
                </li>
                <li>
                  <div className="styled-select currency-selector">
                    <select>
                      <option defaultValue="US Dollars">Indian Rupees</option>
                    </select>
                  </div>
                </li>
                <li>
                  <img
                    src="https://www.combonation.in/assets/img/cards_all.svg"
                    data-src="https://www.combonation.in/assets/img/cards_all.svg"
                    alt=""
                    width={198}
                    height={30}
                    className="lazy loaded"
                    data-was-processed="true"
                  />
                </li>
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="additional_links">
                <li>
                  <Link href="/page/terms-of-service">Terms and conditions</Link>
                </li>
                <li>
                  <Link href="/page/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/page/returns-and-refunds">Returns And Refunds</Link>
                </li>
                <li>
                  <span>
                    © 2021-23 Combonation.in. Powered By Born Unicorn Tech Prise
                    Pvt. Ltd.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
