import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import axios from "axios";
import config from "../config";


export default function Message({ message }) {
  const [reply, setReply] = useState({ body: "" });
  console.log(message);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setReply({ [name]: value });
  };
  const handleClick = () => {
      const json = {...reply, reciever_id:message.sender_id,previous_message_id: message.message_id, subject:message.subject}
    axios
      .post(`${config.serverUrl}/api/message`, json, { withCredentials: true })
      .then((resp) => {
        console.log(resp);
      });
  };
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
              <Stack direction="row">
                <TextField
                  id="filled-helperText"
                  label="Reply"
                  name="body"
                  variant="filled"
                  value={reply.body}
                  onChange={handleChange}
                  fullWidth
                />
                <Box>
                  <Button
                    onClick={handleClick}
                    type="submit"
                    sx={{ height: "100%" }}
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Send
                  </Button>
                </Box>
              </Stack>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </div>
  );
}
