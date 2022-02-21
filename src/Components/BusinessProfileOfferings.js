import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import config from "../config";
import BusinessOfferingForm from "./BusinessOfferingForm";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function BusinessProfileOfferings() {
  const businessProfile = useSelector((state) => state.business.profile);
  console.log(businessProfile);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClick = (e) =>{
    const {value } = e.currentTarget
    axios.delete(`${config.serverUrl}/api/offering/${value}`).then((resp)=>{
      if (resp.status === 200) {
        axios.get(`${config.serverUrl}/api/business/${businessProfile.business_id}/profile`, {withCredentials:true}).then((resp)=>{
          dispatch({ type: "SET_BUSINESS_PROFILE", payload: resp.data });
          navigate('/profile/business')
        })
      }
    })
  }
  useEffect(() => {
    console.log(businessProfile.business_offerings)
    // axios.get(`${config.serverUrl}/api/business-offerings/${businessProfile.business_id}`).then((resp)=>{
    //   console.log(resp.data.offerings)
    // })
  });
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Typography align="center" variant="h5">
        Business Offerings
      </Typography>
      <BusinessOfferingForm businessId={businessProfile.business_id} />

      {businessProfile.business_offerings.map((item) => (
        <ListItem
          key={uuidv4()}
          sx={{ margin: "2px" }}
          secondaryAction={
            <Box>
              <IconButton value={item.id} onClick={handleClick}>
                <EditIcon />
              </IconButton>
              <IconButton value={item.id} onClick={handleClick}>
                <HighlightOffIcon />
              </IconButton>
            </Box>
          }
        >
          <ListItemText primary={`${item.name}`} />
          {/* <ListItemText primary={`${item.description} `} />
          <ListItemText primary={`${item.price}`} /> */}
        </ListItem>
      ))}
    </List>
  );
}
