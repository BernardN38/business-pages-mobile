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
export default function UserMessages() {
  const [messages, setMessages] = useState([]);
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:5000/",
  });
  let user = useSelector((state) => state.user.user);
  useEffect(() => {
    const getMessages = async () => {
      const resp = await instance.get(
        `${config.serverUrl}/api/user/${user.token.user_id}/messages`
      );
      console.log(resp.data);
      setMessages(resp.data);
    };
    getMessages();
  }, []);
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {messages.map((message) => {
        return (
          <div>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={`Subject: ${message.subject}`}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      color="text.primary"
                    >
                      Sender: {message.sender_name}
                    </Typography>
                    {` -- ${message.body}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        );
      })}
    </List>
  );
}
