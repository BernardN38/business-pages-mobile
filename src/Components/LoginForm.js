import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "./Snackbar";
import config from "../config";

const theme = createTheme();

export default function LoginForm() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    axios
      .post(`${config.serverUrl}/login`, data, {
        baseURL: config.serverUrl,
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          localStorage.setItem("token", JSON.stringify(resp.data.token));
          dispatch({ type: "SET_USER", payload: resp.data });
          dispatch({ type: "SET_LOGIN_SUCCESS", payload: true });
          dispatch({ type: "SET_AUTH_MODE", payload: "user" });
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setOpen(true);
      });
  };
  const businessLogin = () => {
    navigate("/business/login");
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
          <Avatar sx={{ m: 1, bgcolor: "primary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid>
                <Link onClick={businessLogin} variant="body2">
                  Business Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        <SimpleSnackbar
          open={open}
          setOpen={setOpen}
          message="Login Failure"
          severity="error"
        />
      </Container>
    </ThemeProvider>
  );
}
