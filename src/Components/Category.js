import React, { useEffect, useState } from "react";
import axios from "axios";
import BusinessHeader from "./BusinessHeader";
import config from "../config";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import CategoryHeader from "./CategoryHeader";

import { v4 as uuid } from "uuid";
export default function Category() {
  const [businesses, setBusinesses] = useState([]);
  const { business_type } = useParams();
  console.log(business_type)
  useEffect(() => {
    axios
      .get(`${config.serverUrl}/api/business?business_type=${business_type}`)
      .then((resp) => {
        setBusinesses(resp.data);
      });
  }, [business_type]);

  return (
    <div>
      <CategoryHeader business_type={business_type} />
      {businesses.map((business) => {
        return (
          <Box sx={{ margin: "4px" }} key={uuid()}>
            <BusinessHeader business={business} link={true} />
          </Box>
        );
      })}
    </div>
  );
}
