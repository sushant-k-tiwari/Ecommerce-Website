import React from "react";
import { Link } from "react-router-dom";
import "./incAll.css"

const BottomBar = () => {
  return (
    <div>
      <section className="bottomBar">
        <ul className="nav  bg-light" style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <li className="nav-item bottomListItem" >
            <Link className="nav-link active" aria-current="page" to="/">
              <i className="bi bi-house-door-fill"></i>
              <br />
              <span>Home</span>
            </Link>
          </li>
          <li className="nav-item bottomListItem">
            <Link className="nav-link" to="/" style={{ paddingLeft: "0"}}>
              <i className="bi bi-ui-checks-grid"></i>
              <br />
              <span>Categories</span>
            </Link>
          </li>
          <li className="nav-item bottomListItem">
            <Link className="nav-link" to="/">
              <i className="bi bi-inboxes-fill"></i>
              <br />
              <span>Build Combo</span>
            </Link>
          </li>
          <li className="nav-item bottomListItem">
            <Link className="nav-link disabled" to="/Cart">
              <i className="bi bi-cart-check-fill"></i>
              <br />
              <span>Cart</span>
            </Link>
          </li>
          <li className="nav-item bottomListItem">
            <Link className="nav-link disabled" to="/Acccount">
              <i className="bi bi-person-circle"></i>
              <br />
              <span>Account</span>
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default BottomBar;
