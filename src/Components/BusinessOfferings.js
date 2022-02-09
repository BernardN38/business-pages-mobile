import React, { useState, useEffect } from "react";
import OfferingCard from "./OfferingCard"
import axios from "axios";
function BusinessOfferings({ business_id = 1 }) {
  const [services, setServices] = useState([]);
  // useEffect(() => {
  //   const getServices = async () => {
  //     const services = await axios.get(
  //       `http://localhost:5000/api/business/${business_id}/menu`
  //     );
  //     setMenu([
  //       { category: services.data.menu_name, food: services.data.foods },
  //     ]);
  //   };
  //   getServices();
  // }, []);
  return <div>
    <OfferingCard/>
  </div>;
}

export default BusinessOfferings;
