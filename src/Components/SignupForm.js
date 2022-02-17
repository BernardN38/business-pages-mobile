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

export default function SignupForm() {
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
    instance.post(`${config.serverUrl}/signup`, data).then((resp) => {
      if (resp.status === 201) {
        console.log(resp.data)
        dispatch({ type: "SET_USER", payload: resp.data });
        dispatch({ type: "SET_LOGIN_SUCCESS", payload: true });
        dispatch({ type: "SET_AUTH", payload: true });
        navigate('/')
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
            Create Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              name="first_name"
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="last_ame"
              label="Last Name"
              name="last_name"
              autoComplete="last_name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="profile_image_url"
              label="Image URL"
              name="profile_image_url"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              type="username"
              id="username"
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
