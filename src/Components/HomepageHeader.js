import React from "react";
import Box from "@mui/material/Box";

export default function HomepageHeader() {
  return (
    <Box sx={{paddingX:'2rem'}}>
      <Box
        sx={{
          borderBottom: "1px solid #757575",
          borderRadius: "3px",
          marginTop: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center", color:'#757575' }}>Explore Categories</h1>
      </Box>
    </Box>
  );
}
