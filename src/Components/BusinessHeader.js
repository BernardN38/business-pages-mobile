import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import "../css/businessheader.css"
function BusinessHeader() {
  // const [value, setValue] = useState("one");
  const [ratingData] = useState({ rating: 4, ratingCount: 104 });
  // const handleChange = (event, newValue) => {
  //   console.log(event)
  //   setValue(newValue);
  // };
  return (
    <Container className="p-1">
      <div className="business-header-main">
        <Stack direction="row" spacing={2}>
          <Avatar src="https://media.istockphoto.com/photos/pizzeria-sign-in-rome-picture-id1189932458?s=612x612"></Avatar>
          <div>
            <h5>Business Name</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </Stack>
        <Stack direction="row" spacing={3} className="h-75">
          <Box className="d-flex justify-content-center align-items-center">
            <Rating name="read-only" value={ratingData.rating} readOnly />
            <Chip
              label={`${ratingData.ratingCount} Ratings`}
              variant="outlined"
            />
          </Box>
          <Box>
            <Button>
              <PhoneInTalkIcon>Call</PhoneInTalkIcon>
              <span>Call</span>
            </Button>
          </Box>
        </Stack>
      </div>
    
    </Container>
  );
}

export default BusinessHeader;
