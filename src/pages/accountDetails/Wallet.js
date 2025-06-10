import React from 'react'
import HomeLayout from '../../layouts/HomeLayout'
import './accountDetails.css'
import Sidebar from "./Sidebar"
import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from "react-icons/ai"


const Wallet = () => {
    return (
        <><HomeLayout>
            <section className="section  pb-5 pt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 first">
                            <Sidebar />
                        </div>

                        <div className="col-md-9">


                            <div className="card">
                                <div className="seccard">
                                    <div className="row" id="wallet">
                                        <div className=" d-flex ">
                                            <img src='./assets/img/wallet.png' width="57.74px" height="50.53px" alt='WishlistImg'/>
                                            <h5> Your Wallet Balance</h5>
                                            <h4 className="reds p-2"><span className="red">₹230</span></h4>
                                        </div>
                                       

                                    </div>
                                    <div className="row p-2 button">
                                        <div className="col-md-8 box">
                                            <div className="cardbox d-flex">
                                                <div className="divs">
                                                    <h6 className="check-point"><i className="bi bi-check-lg check"></i> Exciting Offers
                                                    </h6><br />
                                                    <h6 className="check-point"><i className="bi bi-check-lg check"></i> Quick Checkouts
                                                    </h6>
                                                </div>
                                                <div className="divs">
                                                    <h6 className="check-point"><i className="bi bi-check-lg check"></i> Instant Refunds
                                                    </h6><br />
                                                    <h6 className="check-point"><i className="bi bi-check-lg check"></i> Secure Transactions
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-12 top-up-btn">
                                            <button className='btn  btn-primary'>
                                                Top Up The Wallet
                                                <AiOutlineArrowRight style={{marginLeft: "10px"}} /> 
                                            </button>
                                        </div>

                                    </div>
                                    <div className="row d-flex" style={{justifyContent: "center", alignItems: "center"}}>
                                        <div className="col-md-8">
                                            <h6 className="note">Kindly Note</h6>
                                            <ul className="notes">
                                                <li>Combonation Wallet can not be used to purchase Gift Cards </li>
                                                <li>Combonation Wallet credits have an expiry date, 1 year from date of credit</li>
                                                <li>Combonation Wallet can not be loaded with International Cards</li>
                                                <li>Credit in wallet can not be transferred to a bank account</li>
                                                <li>To know more <Link to="/">read our T&Cs.</Link> </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-4 col-sm-12" style={{textAlign: "end"}}>
                                            <img className='piggy' src='./assets/img/piggy.png' alt="piggy" width="150px" />
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>





            </section>

            </HomeLayout>


        </>
    )
}

export default Wallet