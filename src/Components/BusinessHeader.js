import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import "../css/businessheader.css";
import { Typography } from "@mui/material";
import MessageModal from "./MessageModal";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function BusinessHeader({ business, link }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const authMode = useSelector((state) => state.auth.authMode);
  useEffect(() => {
    const getRating = () => {
      let sum = 0;
      for (const review of business.business_reviews) {
        sum += +review.rating;
      }
      setRating(Math.round(sum / business.business_reviews.length));
    };

    if (business.business_reviews.length > 0) {
      getRating();
    } else {
      setRating(0);
    }
  });
  return (
    <Container className="p-1">
      <div className="business-header-main">
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ height: "70px", width: "70px" }}>
            <img src={business.profile_image_url} width="70"></img>
          </Avatar>
          <div>
            {link ? (
              <Link to={`/business/${business.business_id}`}>
                {business.name || "Business Name"}
              </Link>
            ) : (
              <h5>{business.name || "Business Name"}</h5>
            )}
            <p>{business.description || "Welcome to Our Page"}</p>
          </div>
        </Stack>
        <Stack direction="row" spacing={3} className="h-75" width="100%">
          <Box className="d-flex justify-content-center align-items-center">
            <Rating name="read-only" value={rating} readOnly />
            <Chip
              label={`${business.business_reviews.length} Reviews`}
              variant="outlined"
            />
          </Box>
          <Box>
            {business.phone_number ? (
              <Button>
                <PhoneInTalkIcon/>
                <Typography ><a href={`tel:+${business.phone_number}`}>Call</a></Typography>
              </Button>
            ) : (
              ""
            )}
            {authMode === 'user' ? <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              <MailOutlineIcon />
              <span>Message</span>
            </Button>:''}
            <MessageModal open={open} setOpen={setOpen} />
          </Box>
        </Stack>
      </div>
    </Container>
  );
}

export default BusinessHeader;
