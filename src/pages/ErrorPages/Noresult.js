import React from 'react'
import HomeLayout from "../../layouts/HomeLayout";
const Noresult = () => {
    return (
        <>
            <HomeLayout>
                <section>
                    <div className='container p-5' >

                        <div className='row' style={{
                            textAlign: "center", justifyContent: "center"
                        }}>
                            <div className="text-center" >

                                <img src='./assets/img/banners/noresult.png' style={{ width: "25%" }} alt='....' />
                                <h5 className='pt-5'>No Result Found</h5>
                                <p>Please try again with another keyword or<br></br>
                                    you may please use a generic term</p>
                                <a href="/" className="btn btn-primary move-to-cart">
                                  Search Again
                                </a>

                            </div>
                        </div>
                    </div>

                </section>
            </HomeLayout>
        </>
    )
}

export default Noresult