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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import "../css/businessheader.css";
import capitalize from "../helpers/capitalize";
import { Typography } from "@mui/material";
import MessageModal from "./MessageModal";
function BusinessHeader() {
  const [open,setOpen] = useState(false);
  const business = useSelector((state) => state.business.business);
  const dispatch = useDispatch();

  useEffect(() => {
    const getBusiness = async () => {
      const business_req = await axios.get(
        `http://localhost:5000/api/business/${business.business_id}`
      );
      dispatch({ type: "SET_BUSINESS", payload: business_req.data });
    };
    getBusiness();
  }, []);
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
            <Rating name="read-only" value={+business.rating} readOnly />
            <Chip label={`${100} Ratings`} variant="outlined" />
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
