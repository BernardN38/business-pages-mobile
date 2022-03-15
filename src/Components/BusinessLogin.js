import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import {  useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SimpleSnackbar from "./Snackbar";
import config from "../config";

const theme = createTheme();

export default function BusinessLogin() {
  const [open,setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = new FormData(event.currentTarget);
    axios
      .post(`${config.serverUrl}/business/login`, data, {
        baseURL: config.serverUrl,
        withCredentials: true,
      })
      .then((resp) => {
        console.log(resp)
        if (resp.status === 200) {
          localStorage.setItem('businessToken', JSON.stringify(resp.data.token))
          dispatch({ type: "SET_BUSINESS_TOKEN", payload: resp.data });
          dispatch({ type: "SET_AUTH_MODE", payload: 'business' });
          axios.get(`${config.serverUrl}/api/business/${resp.data.token.business_id}/profile`, {withCredentials:true}).then((resp)=>{
            dispatch({ type: "SET_BUSINESS_PROFILE", payload: resp.data });
            navigate('/profile/business')
          })
        }
      }).catch((error) => {
          setOpen(true)
      });
    
  };
  const businessSignup = () => {
    navigate("/business/signup");
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
            Business Sign in
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
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
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
                  
                </Link>
              </Grid>
              <Grid item>
                <Link onClick={businessSignup} variant="body2">
                  {"Don't have an Business Account? Sign Up"}
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
          severity='error'
        />
      </Container>
    </ThemeProvider>
  );
}
 