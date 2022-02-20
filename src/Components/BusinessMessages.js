import React from "react";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Message from './Message'
export default function BusinessMessages() {
  let messages = useSelector((state) => state.business.profile.messages);
  console.log(messages);

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
