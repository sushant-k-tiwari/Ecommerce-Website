import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
const Expired = () => {
    return (
        <>
            <HomeLayout>
                <section>
                    <div className='container p-5' >

                        <div className='row d-flex'>
                            <div className="col-md-6" >

                                <img src='./assets/img/banners/expired.png' width={300} alt='....' /> </div>
                            <div className='col-md-6'>
                                <h1 style={{ fontSize: 150 }}>419</h1> <hr style={{ color: '#fe9e2d', width: '20%' }}></hr>

                                <p>Sorry, your session has expired.<br/>
                                    Please refresh and try again.</p>
                                <a href="/" className="btn btn-primary move-to-cart">
                                   Go Home
                                </a>

                            </div>
                        </div>
                    </div>

                </section>
            </HomeLayout>
        </>
    )
}

export default Expired