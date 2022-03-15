import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import SimpleSnackbar from "./Snackbar";
import config from "../config";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
const theme = createTheme();

export default function BusinessForm() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: config.serverUrl,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    instance
      .post(`${config.serverUrl}/api/business/signup`, data)
      .then((resp) => {
        if (resp.status === 201) {
          navigate("/");
        }
      });
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
              id="email"
              label="Business Email"
              name="email"
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
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <InputLabel id="demo-simple-select-label">Business Type</InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="businessType"
              name="business_type"
              label="Business Type"
              defaultValue={"food"}
              // onChange={handleChange}
            >
              <MenuItem value={"food"}>Food</MenuItem>
              <MenuItem value={"automotive"}>Automotive</MenuItem>
              <MenuItem value={"phone_repair"}>Phone Repair</MenuItem>
              <MenuItem value={"home_repair"}>Home Repair</MenuItem>
            </Select>
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
