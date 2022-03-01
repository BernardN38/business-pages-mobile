import React, { useEffect, useState } from "react";
import ControlledCarousel from "./Carousel";
import BusinessHeader from "./BusinessHeader";
import BusinessTabs from "./BusinessTabs.js";
import config from "../config";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function BusinessPage() {
  const business = useSelector((state) => state.business.business);
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    const getBusiness = async () => {
      const business_req = await axios.get(
        `${config.serverUrl}/api/business/${id}`
      );
      dispatch({ type: "SET_BUSINESS", payload: business_req.data });
      dispatch({
        type: "SET_REVIEWS",
        payload: business_req.data.business_reviews,
      });
    };
    getBusiness();
  }, [dispatch, id]);

  return (
    <div>
      <ControlledCarousel carouselImages={business.carousel_images} />
      <BusinessHeader business={business} rating={rating} />
      <BusinessTabs />
    </div>
  );
}

export default BusinessPage;
