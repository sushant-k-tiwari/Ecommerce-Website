import React from 'react'
import { Link } from 'react-router-dom'
import HomeLayout from '../../layouts/HomeLayout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const OrderHistory = () => {
  return (
    <>
      <HomeLayout>
        <div className="container">
          <div className="row mt-5" >
            <div className="col-md-8">
              <div className='container' style={{ boxShadow: "1px 1px 10px 0px #dddddd", paddingTop: "50px", paddingBottom: "50px" }}>
              <div className='row' >
                <div className='col-8'>
                  <p><span>Delivered</span> shipped item (1 Delivered)
                    <br />
                    Delivered on Friday,16 December
                    <span>Invoice</span>
                  </p>
                </div>
                <div className='col-4' style={{ textAlign: "center" }}>

                  <a href="">
                    <div className='btn_atc'>
                      Return/Exchange
                    </div>
                  </a>

                </div>
              </div>
              <div>
                <p>Shipping to</p>
                <h3>Gwalesh Singh Panchal</h3>
              </div>
              <div class="order-card " style={{ marginTop: "10px"}}>
                <div class="row">
                  <div class="col-md-2">
                    <img src='./assets/img/wishlist.png' class="order" width="100px" height="100px" />
                  </div>
                  <div class="col-md-10">
                    <p>Jack & Jones Zip-Front Bomber Jacket with Insert Pockets</p>
                    <h4> 1629.00 (includes Convenience Fee)</h4>
                    <h4><span>Size:</span> XL</h4>
                    <p>Return/Exchange window closed on Saturday, 31 December</p>
                    <div className='row' style={{ border: "1px solid #464646", maxHeight: "50px" }}>
                      <div className='col-8' style={{ marginTop: "10px" }}>
                        <div className='row'>
                          <h4 className='col-md-6' >You Rated:</h4>
                          <div className="col-md-6" style={{textAlign: "start"}}>
                            <FontAwesomeIcon icon={faStar} color="gold" />
                            <FontAwesomeIcon icon={faStar} color="gold" />
                            <FontAwesomeIcon icon={faStar} color="gold" />
                            <FontAwesomeIcon icon={faStar} color="gold" />
                            <FontAwesomeIcon icon={faStar} color="gold" />
                          </div>
                        </div>
                      </div>
                      <div className='col-4' style={{ marginTop: "10px",textAlign: "end" }}>
                        <a href="">Add Feedback</a>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
              </div>
            </div>
            <div className="col-md-4 mt-3 overviewMobile">
              <div className="overview-card">
                <div className="overview-card-head">
                  <h3>Order Summary</h3>
                </div>
                <div className="overview-card-body">
                  <h6>
                    Bill Details Items ( Free)
                  </h6>

                  <ul className="price-breakup">
                    <li className="price-type">
                      <p>Total Price (Incl Taxes)</p>
                      <span>₹3,999,000</span>
                    </li>

                    <li className="price-type">
                      <p>Subtotal</p>
                      <span>
                        ₹ 11100
                      </span>
                    </li>
                  </ul>

                </div>
                <hr />
                <div className="overview-card-footer">
                  <div className="total-sec">
                    <p className="total">Total</p>
                    <span className="total">
                      ₹
                    </span>
                  </div>
                  <div className="extras">
                    <p>
                      {" "}
                      Item (Free) | ₹
                    </p>
                    <Link to="/payment" className="btn">
                      Proceed To Pay
                    </Link>
                  </div>
                </div>
              </div>
              <div className='container' style={{ marginTop: "40px", marginBottom: "20px" , border: "1px solid #FE9E2D", paddingTop: "10px" }}>
                <h3>Deliver to</h3>
                <h4>Gwalesh Singh Panchal</h4>
                <p>
                  House No. 222/58, ssdfgvcx vefdff Nft,
                  <br />
                  Near sector 58 fhbjdf,
                  <br />
                  jndjbdjnkczdnjbejdkcjsnk
                  <br />
                   hae hhcs
                   <br />
                   phone : <span>8585252585</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  )
}

export default OrderHistory