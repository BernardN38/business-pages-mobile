import React, { useState } from "react";
import "../css/carousel.css";
import { Carousel } from "react-bootstrap";

function ControlledCarousel({carouselImages=[]}) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}   >
      {carouselImages.map((item,idx) => {
        if (item) {
        return (
          <Carousel.Item key={idx} >
            <img
              className="d-block w-100"
              src={item}
              alt="slide"
              height={"250px"}
            />
          </Carousel.Item>
        );}
      })}
    </Carousel>
  );
}

export default ControlledCarousel;
