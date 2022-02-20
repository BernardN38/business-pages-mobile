import React, { useEffect } from "react";
import UserProfileHeader from "./UserProfileHeader";
import ProfileBody from "./ProfileBody";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import config from "../config";
function UserProfile() {
  let user = useSelector((state) => state.user.user);
  let userData = useSelector((state) => state.user.userData);
  let rank = useSelector((state) => state.user.rank);
  const dispatch = useDispatch();
  const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
  });

  useEffect(() => {
    instance.get(`${config.serverUrl}/api/ranks`).then((resp) => {
      dispatch({
        type: "SET_USER_RANK",
        payload: resp.data[user.token.user_id],
      });
    });
    instance
      .get(`${config.serverUrl}/api/user/${user.token.user_id}/messages`)
      .then((resp) => {
        dispatch({
          type: "SET_USER_MESSAGES",
          payload: resp.data,
        });
      });
  }, []);
  return (
    <div>
      <UserProfileHeader userData={userData} rank={rank} />
      <ProfileBody />
    </div>
  );
}

export default UserProfile;
