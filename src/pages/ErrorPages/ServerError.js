import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
const ServerError = () => {
  return (
    <>
     <HomeLayout>
                <section>
                    <div className='container p-5' >

                        <div className='row d-flex'>
                            <div className="col-md-6" >

                                <img src='./assets/img/banners/server.png' width={300} alt='....' /> </div>
                            <div className='col-md-6'>
                                <h1 style={{ fontSize: 150 }}>500</h1> <hr style={{ color: '#fe9e2d', width: '20%' }}></hr>
                                <h5 style={{ color: 'maroon' }}>Internal Server Error</h5>
                                <p>Sorry,Something Went Wrong :( </p>
                                <a href="/" className="btn btn-primary move-to-cart">
                                   Refresh
                                </a>

                            </div>
                        </div>
                    </div>

                </section>
            </HomeLayout>
    </>
  )
}

export default ServerError