import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./pages/index";
import Cart from "./pages/cart/Cart";
import Product from "./pages/product/Product";
// import Login from "./pages/auth/Login";
import Category from "./pages/category/Category";
import SubCategory from "./pages/category/SubCategory";
import VerifyOtp from "./pages/auth/VerifyOtp";
import SignUp from "./pages/auth/SignUp";
import SignIn from "./pages/auth/SignIn";
import Singleproduct from "./pages/product/Singleproduct";
import BrandProduct from "./pages/category/BrandProduct";
import MYOC from "./pages/MYOC/MYOC";
import Emptycart from "./pages/emptyCart/Emptycart";
import Payment from "./pages/payment/Payment";
import Loginadress from "./pages/adress/Loginadress";
import WCC from "./pages/WCC/WCC.js";
import Store from "./pages/Store/Store";
import Place from "./pages/accountDetails/Place";
import Wishlist from "./pages/accountDetails/Wishlist";
import Wallet from "./pages/accountDetails/Wallet";
import Orders from "./pages/accountDetails/Orders";
import Acccount from "./pages/accountDetails/Acccount";
import BrandLogosList from "./pages/BrandLogosList/BrandLogosList";
import Searchedpage from "./pages/SearchedPage/Searchedpage";
import Adress from "./pages/adress/Adress";
import Freebies from "./pages/FreebiePage/Freebies";
import Thanks from "./pages/thankyou/Thanks";
import OrderHistory from "./pages/OrderHistory/OrderHistory";
import Error from "./pages/ErrorPages/Error";
import Noresult from "./pages/ErrorPages/Noresult";
import ServerError from "./pages/ErrorPages/ServerError";
import Expired from "./pages/ErrorPages/Expired";
import CustomPage from "./pages/category/CustomPage";
import AllCombos from "./pages/category/AllCombos";
import Help from "./components/Help/Help";
import Terms from "./pages/termsConditions/Terms";
import AllBrand from "./pages/category/AllBrand";
import Privacy from "./pages/termsConditions/Privacy";
import Return from "./pages/termsConditions/Return";
import About from "./pages/termsConditions/About";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/Cart" element={<Cart />} />
        <Route path="/combo/:slug" element={<Product />} />
        <Route path="/product/:slug" element={<Singleproduct />} />
        {/* <Route path="/Login" element={<Login />} /> */}
        <Route path="/category/:slug" element={<Category />} />
        <Route path="/subcat/:slug" element={<SubCategory />} />
        <Route path="/subcat" element={<SubCategory />} />
        <Route path="/page/:slug" element={<CustomPage />} />
        <Route path="/brand/:slug" element={<BrandProduct />} />
        <Route path="/VerifyOtp" element={<VerifyOtp />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="Signin" element={<SignIn />} />
        <Route path="/view-all-products" element={<MYOC />} />
        <Route path="/combos" element={<AllCombos />} />
        <Route path="/latestPros" element={<AllBrand />} />
        <Route path="/EmptyCart" element={<Emptycart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/address" element={<Loginadress />} />
        <Route path="/adress" element={<Adress />} />
        <Route path="/why-choose-combonation" element={<WCC />} />
        <Route path="/store/:id" element={<Store />} />
        <Route path="/Acccount" element={<Acccount />} />
        <Route path="/Place" element={<Place />} />
        <Route path="/Wishlist" element={<Wishlist />} />
        <Route path="/Wallet" element={<Wallet />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/brandlogolist" element={<BrandLogosList />} />
        {/* Route for search */}
        <Route path="/search" element={<Searchedpage />} />
        {/* Route for Freebies */}
        <Route path="/freebies" element={<Freebies />} />
        {/* Oreder History */}
        <Route path="/orderhistory" element={<OrderHistory />} />
        {/* <Route path="*" render={() => <Navigate to="/" />} /> */}
        <Route path="*" element={<Error />} />
        {/* <Route path="/Error" element={<Error/>}/> */}
        <Route path="/Noresult" element={<Noresult />} />
        <Route path="/ServerError" element={<ServerError />} />
        <Route path="/Expired" element={<Expired />} />
        <Route path="/help" element={<Help />} />
        <Route path="/page/terms-of-service" element={<Terms />} />
        <Route path="/page/privacy-policy" element={<Privacy />} />
        <Route path="/page/returns-and-refunds" element={<Return />} />
        <Route path="/page/about-us" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
