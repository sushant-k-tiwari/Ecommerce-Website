import React, { useState } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import { Link,useNavigate } from "react-router-dom";
import "./payment.css";
import { useSelector } from "react-redux";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const Payment = () => {
  const navigate = useNavigate()
  // Hide and show button
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowButton(true);
  };
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
  const ExtraFreebiesAmount = freebiestotalAmount - discount;
  let ExtraFreebiesAmountt = 0;
  if (ExtraFreebiesAmount > 0) {
    ExtraFreebiesAmountt = ExtraFreebiesAmount;
  } else if (ExtraFreebiesAmount < 0) {
    ExtraFreebiesAmountt = 0;
  }

  let shippingAmount = 50;

  const totalCartAmount = totalAmount + singletotalAmount;
  const totalCartDiscount = totalDiscount + singletotalDiscount;
  let totalCartSubAmount = subAmount + singlesubAmount + ExtraFreebiesAmountt;
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
    totalCartSubAmount += 50;
    shippingAmountSection = (
      <li className="price-type">
        <p>Shipping</p>
        <span style={{ color: "#009444" }}>₹ {shippingAmount}</span>
      </li>
    );
  } else {
    shippingAmount = 0;
  }

  let FreebiesCartDiscountSection = null;
  if (discount > 0) {
    FreebiesCartDiscountSection = (
      <li className="price-type">
        <p>Freebies Discount</p>
        <span style={{ color: "#009444" }}>
          - ₹{parseFloat(discount).toFixed(0)}
        </span>
      </li>
    );
  }
  

  // Razorpay

  const handlePaymentSuccess = async (response) => {
    try {
      // Make a POST request to your API endpoint with the payment details
      const apiResponse = await makeAPICall(response.razorpay_payment_id);
      
      // Process the API response here if needed
      console.log('API response:', apiResponse);
    } catch (error) {
      console.error('Error while calling API:', error);
    }

    alert('Payment Successful!');
    alert(response.razorpay_payment_id);
    if (!localStorage.getItem("token")) {
      navigate("/adress");
    }else{
      navigate("/address")
    }
    localStorage.setItem('transaction_id', response.razorpay_payment_id);
    setShowButton(true);
  };

  const makeAPICall = async (paymentId) => {
    try {
      // Make a POST request to your API endpoint with the payment ID
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/getRazorpayDetails`, {
        payment_id: paymentId,
        // Add more payment details as needed
      },
      {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      });
      console.log(response.data)
      return response.data;
       // Return the API response if needed
    } catch (error) {
      throw new Error('Error while calling API:', error);
    }
  };


  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const options = {
      key: `${process.env.REACT_APP_RAZORPAY_KEY}`,
      amount: Math.round(Number(totalCartSubAmount) * 100),
    
      currency: 'INR',
      name: 'Combonation',
      description: 'Test payment',
      handler: handlePaymentSuccess,
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // async function displayRazorpay() {
  //   const res = await loadScript(
  //     "https://checkout.razorpay.com/v1/checkout.js"
  //   );

  //   if (!res) {
  //     alert("Razorpay SDK failed to load. Are you Online");
  //     return;
  //   }

  //   const options = {
  //     key: "rzp_test_7Ynqg7Kwiuxr5Z",
  //     amount: Number(totalCartSubAmount) * 100,
  //     currency: "INR",
  //     name: "Combonation",
  //     description: "Test payment",
  //     handler: function (response) {
  //       alert("Payment Successful!");
  //       alert(response.razorpay_payment_id);
  //       localStorage.setItem("transaction_id", response.razorpay_payment_id);
  //       setShowButton(true);
        
  //     },
  //   };
  
    

  //   const paymentObject = new window.Razorpay(options);
  //   paymentObject.open();
  // }

  return (
    <>
      <HomeLayout>
        <section className="payment">
          <div className="container">
            <div className="row text-center py-5" id="progessbarRow">
              <ul className="" id="progressbarr">
                <div className="col-md-4 col-sm-4">
                  <Link to="/Cart" className="bagLink">
                    <li id="bag">Bag</li>
                  </Link>
                </div>
                <div className="col-md-4 col-sm-4">
                  <Link to="/payment" className="active">
                    <li id="address">Payment</li>
                  </Link>
                </div>
                <div className="col-md-4 col-sm-4">
                  <li id="payment">Address</li>
                </div>
              </ul>
            </div>
            <hr />
            <div className="row">
              <div className="col-md-8">
                <div className="card" style={{ marginTop: "1rem" }}>
                  <div className="row " style={{ alignItems: "center" }}>
                    <div className="col-md-4">
                      <div className="form-group">
                        <input
                          onClick={displayRazorpay}
                          type="radio"
                          name="payment_type"
                          id
                          className="form-check-input"
                        />
                        <label
                          htmlFor="payment_type"
                          className="form-label"
                          style={{ marginLeft: "1rem" }}
                        >
                          Online Payment
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4 ">
                      <img
                        src="./assets/img/paymentSection/Group_1735.png"
                        alt="paymentOptions"
                        width="60%"
                        style={{ marginLeft: "0" }}
                        height="20%"
                      />
                    </div>
                    <div className="col-md-4 text-center desktop">
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
                <div className="card" style={{ marginTop: "1rem" }}>
                  <div className="row" style={{ position: "relative", alignItems: "center" }}>
                    <div className="col-6">
                      <div className="form-group">
                        <input
                          type="radio"
                          name="payment_type"
                          id
                          className="form-check-input"
                          onClick={handleClick}
                        />
                        <label
                          htmlFor="payment_type"
                          className="form-label"
                          style={{ marginLeft: "1rem" }}
                        >
                          Cash On Delivery
                        </label>
                        <br />
                        <span style={{ color: "#A2A2A2", marginLeft: "2rem" }}>
                          This shipping option is eligible for COD
                        </span>
                      </div>
                    </div>
                    <div className="col-2">
                      <img
                        src="./assets/img/PaymentSection/Group_2286.png"
                        alt="cashImg"
                        style={{ border: ".1px solid #507C50" }}
                      />
                    </div>
                    <div className="col-4 text-center pb-0 desktop">
                      <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
                {/* <div className="row my-5">
                  <div className="col-md-6">
                    <div className="go-back">
                      <Link to="/Cart">
                        <i className="bi bi-chevron-left" />
                        Go Back
                      </Link>
                    </div>
                  </div>
                  
                </div> */}
              </div>

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
                      {FreebiesCartDiscountSection}
                      {shippingAmountSection}
                      <li className="price-type">
                        <p>Subtotal</p>
                        <span>
                          ₹{parseFloat(totalCartSubAmount).toFixed(0)}
                        </span>
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
                      {showButton && (
                        <Link to="/Address" className="btn">
                         Add Delivery Details
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                
        </section>
      </HomeLayout>
    </>
  );
};

export default Payment;
