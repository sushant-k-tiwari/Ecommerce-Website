import React from "react";
import "./cart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Card = () => {
  // Single Product Cart

  const { singletotalCount } = useSelector((statee) => statee.SingleCart);

  const { singlesubAmount, singletotalAmount, singletotalDiscount } =
    useSelector((statee) => statee.SingleCart);

  // Combo Product Cart

  const { totalCount } = useSelector((state) => state.cart);
  const { subAmount, totalAmount, totalDiscount } = useSelector(
    (state) => state.cart
  );

  // Freebies cart section
  const { freebiesCount } = useSelector((state) => state.freebies);
  const { freebiestotalAmount } = useSelector((state) => state.freebies);

  const totalCartCount = totalCount + singletotalCount;

  let discount = 0;
  switch (true) {
    case singlesubAmount >= 1000 && singlesubAmount < 3000:
      discount = (singlesubAmount * 20) / 100;
      break;
    case singlesubAmount >= 3000 && singlesubAmount < 5000:
      discount = (singlesubAmount * 30) / 100;
      break;
    case singlesubAmount >= 5000 && singlesubAmount <= 10000:
      discount = (singlesubAmount * 40) / 100;
      break;
    case singlesubAmount >= 10000 && singlesubAmount <= 15000:
      discount = (singlesubAmount * 50) / 100;
      break;
    case singlesubAmount >= 15000 && singlesubAmount <= 20000:
      discount = (singlesubAmount * 60) / 100;
      break;
    case singlesubAmount >= 20000 && singlesubAmount <= 100000:
      discount = (singlesubAmount * 100) / 100;
      break;
    default:
      discount = 0;
      break;
  }

  // Total Pricing of products
  let ExtraFreebiesAmount = freebiestotalAmount - discount;
  const shippingAmount = 50;

  const totalCartAmount = totalAmount + singletotalAmount;
  const totalCartDiscount = totalDiscount + singletotalDiscount + discount;
  const totalCartSubAmount =
    subAmount + singlesubAmount + ExtraFreebiesAmount + shippingAmount;

  // Extra freebies amount

  let ExtraFreebiesAmountSection = null;
  if (freebiestotalAmount > discount) {
    ExtraFreebiesAmountSection = (
      <li className="price-type">
        <p>Extra Freebie Amount</p>
        <span>₹{parseFloat(ExtraFreebiesAmount).toFixed(0)}</span>
      </li>
    );
  }

  // if discount is 0 then hide the section

  let discountSection = null;
  if (totalCartDiscount > 0) {
    discountSection = (
      <li className="price-type">
        <p>Total Discount</p>
        <span style={{ color: "#009444" }}>
          - ₹{parseFloat(totalCartDiscount).toFixed(0)}
        </span>
      </li>
    );
  }

  // Hurry discount section

  let hurrryDiscountSection = null;
  if (totalCartDiscount > 0) {
    hurrryDiscountSection = (
      <span>
        Hurray! You Saved{" "}
        <strong>₹{parseFloat(totalCartDiscount).toFixed(0)}</strong> On This
        Order
      </span>
    );
  }

  // Shipping amount less than 499

  let shippingAmountSection = null;

  if (totalCartSubAmount < 499) {
    shippingAmountSection = (
      <li className="price-type">
        <p>Shipping</p>
        <span style={{ color: "#009444" }}>₹ {shippingAmount}</span>
      </li>
    );
  }

  return (
    <>
      <div className="col-md-4 mt-5">
        <div className="overview-card">
          <div className="overview-card-head">
            <h3>Order Summary</h3>
          </div>
          <div className="overview-card-body">
            <h6>
              Bill Details {totalCartCount} Items ({freebiesCount} Free)
            </h6>

            <ul className="price-breakup">
              <li className="price-type">
                <p>Total Price (Incl Taxes)</p>
                <span>₹{parseFloat(totalCartAmount).toFixed(0)}</span>
              </li>
              {ExtraFreebiesAmountSection}
              {discountSection}
              {shippingAmountSection}
              <li className="price-type">
                <p>Subtotal</p>
                <span>₹{parseFloat(totalCartSubAmount).toFixed(0)}</span>
              </li>
            </ul>
            {hurrryDiscountSection}
          </div>
          <hr />
          <div className="overview-card-footer">
            <div className="total-sec">
              <p className="total">Total</p>
              <span className="total">
                ₹{parseFloat(totalCartSubAmount).toFixed(0)}
              </span>
            </div>
            <div className="extras">
              <p>
                {" "}
                {totalCartCount} Item ({freebiesCount} Free) | ₹
                {parseFloat(totalCartSubAmount).toFixed(0)}
              </p>
              <Link to="/Adress" className="btn">
                Proceed To Pay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
