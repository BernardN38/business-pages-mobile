import React, { useEffect, useState } from "react";
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
import capitalize from "../helpers/capitalize";
import { Typography } from "@mui/material";
import MessageModal from "./MessageModal";
import config from '../config'

function BusinessHeader({business,rating}) {
  const [open,setOpen] = useState(false);
  
  
  return (
    <Container className="p-1">
      <div className="business-header-main">
        <Stack direction="row" spacing={2}>
          <Avatar src={business.profile_image_url}></Avatar>
          <div>
            <h5>{capitalize(business.name) || "Business Name"}</h5>
            <p>{business.description || "Welcome to Our Page"}</p>
          </div>
        </Stack>
        <Stack direction="row" spacing={3} className="h-75">
          <Box className="d-flex justify-content-center align-items-center">
            <Rating name="read-only" value={rating/business.business_reviews.length} readOnly />
            <Chip label={`${business.business_reviews.length} Reviews`} variant="outlined" />
          </Box>
          <Box>
            {business.phone_number ? (
              <Button>
                <PhoneInTalkIcon>Call</PhoneInTalkIcon>
                <Typography>Call</Typography>
              </Button>
            ) : (
              ""
            )}
            <Button onClick={()=>{setOpen(true)}}>
              <MailOutlineIcon />
              <span>Message</span>
            </Button>
            <MessageModal open={open} setOpen={setOpen}/>
          </Box>
        </Stack>
      </div>
    </Container>
  );
}

export default BusinessHeader;
