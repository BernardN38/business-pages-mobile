import React, { useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {  useDispatch } from "react-redux";
import SimpleSnackbar from "./Snackbar";
import { useNavigate } from "react-router-dom";
import config from "../config";

const theme = createTheme();

export default function BusinessForm() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    instance.post(`${config.serverUrl}/business/signup`, data).then((resp)=>{
        console.log(resp)
    })
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Create Business Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Business Name"
              name="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Business Description"
              name="description"
         
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="phone_number"
              label="Phone Number"
              name="phone_number"
            />
            <TextField
              margin="normal"
             
              fullWidth
              name="profile_image_url"
              label="Profile Image URL"
              type="profile_image_url"
              id="profile_image_url"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="business_type"
              label="Business Type"
              id="business_type"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <SimpleSnackbar
          success={loginSuccess}
          setLoginSuccess={setLoginSuccess}
        />
      </Container>
    </ThemeProvider>
  );
}
