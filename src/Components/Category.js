import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessHeader from "./BusinessHeader";
import config from "../config";
import { useParams } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";

export default function Category() {
  const [businesses, setBusinesses] = useState([]);
  const { business_type } = useParams();
  console.log(business_type)
  useEffect(() => {
    axios
      .get(`${config.serverUrl}/api/business?business_type=${business_type}`)
      .then((resp) => {
        console.log(resp.data)
        setBusinesses(resp.data);
      });
  },[]);
  return (
    <div>
      <CategoryHeader business_type={business_type}/>
      {businesses.map((business) => {
        return <BusinessHeader business={business} link={true} />;
      })}
    </div>
  );
}
