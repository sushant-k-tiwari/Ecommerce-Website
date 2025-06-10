import StoreCarousel from "./StoreCarousel";
import StoreAdress from "./StoreAdress";
import StoreLoacter from "./StoreLoacter";
import './store.css'
import React from "react";
import HomeLayout from "../../layouts/HomeLayout";

const Store = () => {
  return (
    <>
      <HomeLayout>
        <StoreCarousel />
        <StoreAdress />
        <StoreLoacter />
      </HomeLayout>
    </>
  );
};

export default Store;
