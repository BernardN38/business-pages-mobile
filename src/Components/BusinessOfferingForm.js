import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import OfferingCard from "./OfferingCard";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import config from '../config'
import { Typography } from "@mui/material";

export default function BusinessOfferingForm({businessId}) {
  const [offering, setOffering] = useState({
    name: "",
    price: "",
    image_url: "",
    description: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
      e.preventDefault()
      axios.post(`${config.serverUrl}/api/business-offering/${businessId}`,offering, {withCredentials:true}).then((resp)=>{
          axios.get(`${config.serverUrl}/api/business/${businessId}/profile`, {withCredentials:true}).then((resp)=>{
            dispatch({ type: "SET_BUSINESS_PROFILE", payload: resp.data });
            navigate('/profile/business')
          })
        
      })
      console.log(offering)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setOffering({
      ...offering,
      [name]: value,
    });
  };
  return (
    <div>
      <Typography variant="h6" align="center">Add new offering</Typography>
      <OfferingCard offering={offering} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            // sx={{ mt: 1 }}
          >
            <TextField
              margin="dense"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              onChange={handleInputChange}
              autoFocus
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="price"
              label="Price"
              type="price"
              id="price"
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="image_url"
              label="Image URL"
              type="image_url"
              id="image_url"
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
