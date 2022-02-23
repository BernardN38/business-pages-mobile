import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "./Snackbar";
import config from "../config";
const theme = createTheme();

export default function UserEditForm() {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    instance
      .post(`${config.serverUrl}/api/user/${user.token.user_id}`, data)
      .then((resp) => {
        if (resp.status === 200) {
          console.log(resp.data, "code 200");
          navigate("/profile");
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
            Edit Profile
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
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password to comfirm changes"
              type="password"
              id="password"
              autoComplete="current-password"
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
