import React, { useEffect, useState } from "react";
import BusinessProfileHeader from "./BusinessProfileHeader";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import BusinessProfileBody from "./BusinessProfileBody";
import config from "../config";
export default function BusinessProfile() {
  const businessToken = useSelector((state) => state.business.token);
  const dispatch = useDispatch();
  const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
  });

  useEffect(() => {
    if (!businessToken.token) {
      const storedToken = JSON.parse(localStorage.getItem("businessToken"));
      if (storedToken) {
        instance
          .get(`${config.serverUrl}/api/business/${storedToken.business_id}`)
          .then((resp) => {
            dispatch({ type: "SET_BUSINESS_PROFILE", payload: resp.data });
          });
        dispatch({ type: "SET_BUSINESS_TOKEN", payload: { token: storedToken } });
      } else {
        axios
          .get(`${config.serverUrl}/api/checkin`, {
            withCredentials: true,
          })
          .then((resp) => {
            if (resp.status === 200) {
              dispatch({
                type: "SET_BUSINESS_TOKEN",
                payload: { token: resp.data },
              });
              instance
                .get(`${config.serverUrl}/api/business/${resp.data.user_id}`)
                .then((resp) => {
                  dispatch({ type: "SET_BUSINESS_PROFILE", payload: resp.data });
                });
            }
          });
      }
    // } else {
    //   instance
    //     .get(`${config.serverUrl}/api/user/${user.token.user_id}`)
    //     .then((resp) => {
    //       dispatch({ type: "SET_USER_DATA", payload: resp.data });
    //     });
    }
  }, []);
  return (
    <div>
      <BusinessProfileHeader />
      <BusinessProfileBody/>
    </div>
  );
}
