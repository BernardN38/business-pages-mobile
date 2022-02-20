import React from "react";
import BusinessCategories from "./BusinessCategories";
import HomepageHeader from "./HomepageHeader";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <Stack>
      <HomepageHeader />
      <BusinessCategories />

      <Box textAlign="center">
        <Link to="/business/signup">Add your business to our pages!</Link>
      </Box>
    </Stack>
  );
}
