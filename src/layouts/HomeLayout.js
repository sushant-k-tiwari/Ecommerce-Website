import React from 'react';
import Header from '../components/inc/Header';
import Footer from '../components/inc/Footer';
// import BottomBar from '../components/inc/BottomBar';


const HomeLayout = ({children}) => {
  
  return (
    <div style={{ width: "100vw",overflowX:"hidden"}}>
        <main>
            <Header></Header>
                {children}
            <Footer></Footer>
        </main>
    </div>
  )
}

export default HomeLayout;