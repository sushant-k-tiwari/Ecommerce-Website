import React from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'



const Testimonials = () => {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  

  return (
    <>
      {/* desktop */}

      <div className="desktop">
        <Carousel
          arrows={false}
          responsive={responsive}
          infinite={true}
          autoPlay
          centerMode
        >
          <div className="text-center textCard" style={{ padding: "1rem 0 0 0", margin: "2rem 1rem", overflow: "hidden" }}>
            <div className="col">
              <FontAwesomeIcon icon={faStar} color="gold" />
              <FontAwesomeIcon icon={faStar} color="gold" />
              <FontAwesomeIcon icon={faStar} color="gold" />
              <FontAwesomeIcon icon={faStar} color="gold" />
              <FontAwesomeIcon icon={faStar} color="gold" />
            </div>
            <p style={{ fontSize: "20px", fontWeight: "medium" }}>Site-seeing at Combonation</p>
            <p style={{ width: "600px", height: "120px", fontWeight: "italic", overflowY: "hidden", margin: "auto" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
            <div>
              <p style={{ marginBottom: ".2rem" }}>Suhavi Sharma</p>
              <p>Jaipur</p>
            </div>
          </div>
          
        </Carousel>
      </div>

      {/* Mobile */}

      <div className="mobile p-6">
        <Carousel
          arrows={false}
          responsive={responsive}
          infinite={true}
          // centerMode
          // autoPlay
        >
          <div style={{ marginRight: "10px", width: "100%" }}>
            <div className="text-center textCard" style={{ padding: "2rem", boxShadow: "3px 10px 8px 10px #F6F6F6", border: "none" }}>
              <div className="col">
                <FontAwesomeIcon icon={faStar} color="gold" />
                <FontAwesomeIcon icon={faStar} color="gold" />
                <FontAwesomeIcon icon={faStar} color="gold" />
                <FontAwesomeIcon icon={faStar} color="gold" />
                <FontAwesomeIcon icon={faStar} color="gold" />
              </div>
              <p style={{ padding: "8px", fontSize: "11px", color: "#464646" }}>Site-seeing at Combonation</p>
              <p style={{ maxHeight: "75px", overflow: "hidden" }}>To begin with, the fact that the site gives you the authority to create your combos is really helpful. Also, this is the perfect destination that saves you time instead of running errands every weekend and missing out on parties. Do visit this beautiful site every weekend.</p>
              <div>
                <p style={{ fontSize: "15px", fontWeight: "bold" }}>Suhavi Sharma</p>
                <p>Jaipur</p>
              </div>
            </div>
          </div>
        </Carousel>
      </div>







    </>
  );
};

export default Testimonials;
