import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessHeader from "./BusinessHeader";
import config from "../config";
import { useParams } from "react-router-dom";
import CategoryHeader from "./CategoryHeader";
import {v4 as uuid } from 'uuid';
export default function Category() {
  const [businesses, setBusinesses] = useState([]);
  const { business_type } = useParams();

  useEffect(() => {
    axios
      .get(`${config.serverUrl}/api/business?business_type=${business_type}`)
      .then((resp) => {
        setBusinesses(resp.data);
      });
  },[business_type]);

  return (
    <div>
      <CategoryHeader business_type={business_type}/>
      {businesses.map((business) => {
        return <BusinessHeader key={uuid()} business={business} link={true} />;
      })}
    </div>
  );
}
