import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const StoreAdress = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [storeAddress, setStoreAddress] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null);
      const options = {
        headers: {
          "X-Authorization": `${process.env.REACT_APP_HEADER}`,
        },
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/store/${id}`,
          options
        );
        setStoreAddress(response.data);
        setLoading(false)
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const retryAfter = parseInt(error.response.headers["retry-after"]);
          setTimeout(() => {
            fetchData();
          }, retryAfter * 1000);
        } else {
          setError(error.message);
        }
      }
    }
    fetchData();
  }, [id]);

  if (error) {
    console.log(error)
  }

  return (
    <>
      <div className="col">
        {loading && <div id="cover-spin"></div>}
        <div className="storeAddressSection">
          <h2 className="text-center">Store Address :</h2>
          <p className="text-center">{storeAddress.full_address}</p>
          <p className="text-center">Mobile : {storeAddress.phone}</p>
        </div>
      </div>
    </>
  );
};

export default StoreAdress;
