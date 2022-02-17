import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/user-profile-header.css";
import config from "../config";
function UserProfileHeader() {
  axios.defaults.withCredentials = true;
  let user = useSelector((state) => state.user.user);
  let userData = useSelector((state) => state.user.userData);
  let rank = useSelector((state) => state.user.rank);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true
  const instance = axios.create({
    withCredentials: true,
    baseURL: config.serverUrl,
  });

  useEffect(() => {
    instance
      .get(`${config.serverUrl}/api/user/${user.token.user_id}`)
      .then((resp) => {
        console.log(resp.data)
        dispatch({ type: "SET_USER_DATA", payload: resp.data });
      });
    instance.get(`${config.serverUrl}/api/ranks`).then((res) => {
      dispatch({
        type: "SET_USER_RANK",
        payload: res.data[user.token.user_id],
      });
    });
  }, []);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      marginTop={1}
      bgcolor="paper.secondary"
      width={"100%"}
    >
      <Card sx={{ width: "90%" }}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          padding={1}
        >
          <Avatar sx={{ height: "70px", width: "70px" }} src={userData.profile_image_url} />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" align="center">
            {userData.username}
          </Typography>
        </CardContent>
        <Stack direction="row">
          <div className="user-header-badge">Score: {userData.score}</div>
          <div className="user-header-badge">
            Reviews: {userData.reviews.length}
          </div>
          <div className="user-header-badge">Rank: {rank}</div>
        </Stack>
      </Card>
    </Box>
  );
}
export default UserProfileHeader;
