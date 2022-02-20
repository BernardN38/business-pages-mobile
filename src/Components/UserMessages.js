import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import config from "../config";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Message from "./Message";
export default function UserMessages() {
  let messages = useSelector((state) => state.user.messages);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {messages.map((message) => {
        return (
          <Message key={uuidv4()} message={message}/>
        );
      })}
    </List>
  );
}
