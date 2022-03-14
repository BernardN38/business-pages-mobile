import React, { useState } from "react";
import "../css/carousel.css";
import { Carousel } from "react-bootstrap";

function ControlledCarousel({ carouselImages = [] }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="container-main">
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {carouselImages.map((item, idx) => {
          if (item) {
            return (
              <Carousel.Item key={idx}>
                <img className="d-block carousel-img" src={item} alt="slide" />
              </Carousel.Item>
            );
          }
        })}
      </Carousel>
    </div>
  );
}

export default ControlledCarousel;
