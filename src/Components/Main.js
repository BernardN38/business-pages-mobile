import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Navbar from "./Navbar";
import SimpleSnackbar from "./Snackbar";
import config from "../config";

function Main() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const loginSuccess = useSelector((state) => state.login.loginSuccess);
  const authMode = useSelector((state) => state.auth.authMode);
  const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
  });
  useEffect(() => {
    console.log('auth mode', authMode)
    if (authMode === "user") {
      console.log('auth mode user')
      if (!user.token) {
        const storedToken = JSON.parse(localStorage.getItem("userToken"));
        if (storedToken) {
          instance
            .get(`${config.serverUrl}/api/user/${storedToken.user_id}`)
            .then((resp) => {
              console.log(resp)
              dispatch({ type: "SET_USER_DATA", payload: resp.data });
            });
          dispatch({ type: "SET_USER", payload: { token: storedToken } });
        } else {
          axios
            .get(`${config.serverUrl}/api/checkin`, {
              withCredentials: true,
            })
            .then((resp) => {
              console.log(resp.data);
              if (resp.status === 200) {
                dispatch({ type: "SET_USER", payload: { token: resp.data } });
                instance
                  .get(`${config.serverUrl}/api/user/${resp.data.user_id}`)
                  .then((resp) => {
                    dispatch({ type: "SET_USER_DATA", payload: resp.data });
                  });
              }
            });
        }
      } else {
        instance
          .get(`${config.serverUrl}/api/user/${user.token.user_id}`)
          .then((resp) => {
            dispatch({ type: "SET_USER_DATA", payload: resp.data });
          });
      }
    }
  }, [authMode]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <SimpleSnackbar
        success={loginSuccess}
        message="Login Successful"
        severity="success"
      />
    </div>
  );
}
export default Main;
