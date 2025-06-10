import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchhotdeal } from "../features/actions/hotdealActions";

const HotDeals = () => {
  const dispatch = useDispatch();
  const { hotdeal } = useSelector((state) => state.hotdeal);
  useEffect(() => {
    dispatch(fetchhotdeal());
  }, [dispatch]);

  return (
    <div>
      <div className="container my-5">
        <div className="hot-deals text-center">
          <h3 className="flashdeal">Super Flash Deals For You</h3>
        </div>

        {Array.isArray(hotdeal) &&
          hotdeal.map((e) => (
            <div key={e.banner?.id}>
              <Link to="/view-all-products">
                <img
                  src={e.banner?.original_url}
                  width="100%"
                  alt="super-flash-Deal"
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HotDeals;
