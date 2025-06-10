import React from 'react'
import "./Help.css"
import HomeLayout from "../../layouts/HomeLayout"
import Categories from '../home/Categories/Categories'

const Help = () => {
    return (
        <>
            <HomeLayout >
                <Categories></Categories>
                <div className='container'>
                    <div className="desktop">
                        <div className="row " style={{ margin: "50px" }}>
                            <div className="col">
                                <div>
                                    <h1 style={{ color: "#999999" }}>Contact Us</h1>
                                    <h5 style={{ color: "#999999" }}>How do you wish to contact us</h5>

                                    <div className='row' style={{ marginTop: "50px" }}>
                                        <div className="col-md-1">
                                            <img src="./assets/img/mailIcon.svg" alt="" />
                                        </div>
                                        <div className="col-md-10">
                                            <h5 style={{ color: "#464646" }}>Write to Us</h5>
                                            <p style={{ color: "#999999" }}>For a better experience, call from your
                                                registered number.</p>
                                            <a href="mailto:care@combonation.in">care@combonation.in</a>
                                        </div>
                                        <div className="col-md-12"><br /></div>
                                        <div className="col-md-12"><br /></div>

                                        
                                        
                                        <div className="col-md-1">
                                            <img src="./assets/img/phoneCallImg.svg" alt="" />
                                        </div>
                                        <div className="col-md-10">
                                            <h5 style={{ color: "#464646" }}>Call Now</h5>
                                            <p style={{ color: "#999999" }}>Average response time 24-48hrs</p>
                                            <a href="">9910722205</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <img src="../assets/img/helpImg.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* for mobile */}
                <div className='container'>
                    <div className="mobile">
                        <div className="col" style={{ margin: "50px" }}>
                            <div className="row">
                                <div>
                                    <h1 style={{ color: "#999999" }}>Contact Us</h1>
                                    <h5 style={{ color: "#999999" }}>How do you wish to contact us</h5>

                                    <div className='row' style={{ marginTop: "50px" }}>
                                        <div className="col-2">
                                            <img src="./assets/img/mailIcon.svg" alt="" />
                                        </div>
                                        <div className="col-10">
                                            <h5 style={{ color: "#464646" }}>Write to Us</h5>
                                            <p style={{ color: "#999999" }}>For a better experience, call from your
                                                registered number.</p>
                                            <a href="mailto:care@combonation.in">care@combonation.in</a>
                                        </div>
                                        <div className="col-md-12"><br /></div>
                                        <div className="col-md-12"><br /></div>

                                        
                                        
                                        <div className="col-2">
                                            <img src="./assets/img/phoneCallImg.svg" alt="" />
                                        </div>
                                        <div className="col-10">
                                            <h5 style={{ color: "#464646" }}>Call Now</h5>
                                            <p style={{ color: "#999999" }}>Average response time 24-48hrs</p>
                                            <a href="">9910722205</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{position:"relative" , height:"140px",}}>
                                <img style={{position:"absolute" ,width: "56%",
    
    bottom: "5px",
    left: "140px",
}} src="../assets/img/helpImg.png" alt=""  />
                            </div>
                        </div>
                    </div>
                </div>


            </HomeLayout>

        </>
    )
}

export default Help
