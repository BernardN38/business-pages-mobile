import React, { useState } from "react";
import "../css/carousel.css";
import { Carousel } from "react-bootstrap";
function ControlledCarousel() {
  const [index, setIndex] = useState(0);
  const [items, setItems] = useState([
    {
      src: "https://cdn.vox-cdn.com/thumbor/ew8i4npv71ZawLACdH245qK0VE8=/0x0:5174x3449/1200x800/filters:focal(2174x1312:3000x2138)/cdn.vox-cdn.com/uploads/chorus_image/image/67086155/shutterstock_1497472160.0.jpg",
    },
    {
      src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1914&q=80",
    },
    {
      src: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    },
  ]);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}   >
      {items.map((item) => {
        return (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={item.src}
              alt="First slide"
              height={"250px"}
            />
            {/* <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption> */}
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default ControlledCarousel;
