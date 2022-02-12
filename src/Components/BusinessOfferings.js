import React, { useState, useEffect } from "react";
import OfferingCard from "./OfferingCard"
import axios from "axios";
import { useSelector } from 'react-redux';

function BusinessOfferings() {
  const [offerings, setOfferings] = useState([]);
  const business = useSelector((state) => state.business.business)

  useEffect(() => {
    const getOfferings = async () => {
      const offeringReq = await axios.get(`http://localhost:5000/api/business-offerings/${business.business_id}`)
      setOfferings(offeringReq.data.offerings)
    }
    getOfferings()
  }, [])
  return <div>
    {offerings.map((offering, idx) => {
      return <OfferingCard key={idx} offering={offering} />
    })}

  </div>;
}

export default BusinessOfferings;
