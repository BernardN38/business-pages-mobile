import React, { useEffect, useState } from "react";
import ControlledCarousel from "./Carousel";
import BusinessHeader from "./BusinessHeader";
import BusinessTabs from "./BusinessTabs.js";
import config from "../config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
function BusinessPage() {
  const [rating, setRating] = useState(0);
  const business = useSelector((state) => state.business.business);
  const dispatch = useDispatch();
  useEffect(() => {
    const getBusiness = async () => {
      const business_req = await axios.get(
        `${config.serverUrl}/api/business/${business.business_id}`
      );

      dispatch({ type: "SET_BUSINESS", payload: business_req.data });
      dispatch({
        type: "SET_REVIEWS",
        payload: business_req.data.business_reviews,
      });
    };
    getBusiness();

    let sum = 0;
    for (const review of business.business_reviews) {
      sum += review.rating;
    }
    setRating(sum);
    console.log(sum);
  }, []);
  return (
    <div>
      <ControlledCarousel />
      <BusinessHeader business={business} rating={rating} />
      <BusinessTabs />
    </div>
  );
}

export default BusinessPage;
