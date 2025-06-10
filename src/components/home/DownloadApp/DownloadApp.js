import React from 'react';
import "./DownloadApp.css"

const DownloadApp = () => {
    return (
        <div className='MainAppDownloadDiv'>
            <section className="sectionDiv">
                <div className="container">
                    <div className="row addingPadding">
                        <div className="col-md-6 text-left" >
                            <h2 className='downloadAppHeading'>Download The <span style={{ color: "#FE9E2D", }}>App</span> Now!</h2>
                            <h6 className='signUpText'>Use code <span className='codeText'>SIGNUP10</span> and get upto <strong>Extra 10% off</strong> on your first order</h6>
                            <div className="QR">
                                <img src="./assets/img/QR/onelinkto_add7up.png" alt="QR" width="150px" height="150px" />
                                <p style={{color: "#464646" }}>*On the min purchase of `999</p>
                            </div>
                        </div>
                        <div className="col-md-6 desktop">
                            <div className="mockup-img">
                                <img src="./assets/img/downloadAppImg/CN_Mock.png" className="mobileAppImg" height="450px" style={{}} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DownloadApp;