import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Navbar from "./Navbar";
import SimpleSnackbar from "./Snackbar";
import config from "../config";
function Main() {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user.user);
  let loginSuccess = useSelector((state) => state.login.loginSuccess)
  const instance = axios.create({
   withCredentials: true,
   baseURL: config.serverUrl,
 });
  useEffect(() => {
    if (user.token){
      instance
      .get(`${config.serverUrl}/api/user/${user.token.user_id}`)
      .then((resp) => {
        console.log(resp.data);
        dispatch({ type: "SET_USER_DATA", payload: resp.data });
      });
    }
  }, [user]);
  return (
    <div>
      <Navbar />
      <Outlet />
      <SimpleSnackbar
          success={loginSuccess}
          message="Login Successful"
          severity='success'
        />
    </div>
  );
}
export default Main;
