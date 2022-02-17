import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Button,
  Input,
  Stack,
  Box,
  TextField,
  Typography,
} from "@mui/material";

export default function DirectMessageForm() {
  const [messageForm, setMessageForm] = useState({
    subject: "",
    body: "",
  });
  
  const handleSubmit = (e) => {
   
    const json = JSON.stringify(messageForm);
  
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageForm({
      ...messageForm,
      [name]: value,
    });
  };
  return (
      
      <Box sx={{ borderBottom: 1 }}>
        <Stack sx={{ m: 1 }}>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Direct Message
          </Typography>
          <FormControl>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="subject"
              aria-describedby="my-helper-text"
              name="subject"
              value={messageForm.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl sx={{ marginTop: 1 }}>
            <InputLabel htmlFor="body" />
            <TextField
              multiline={true}
              minRows={10}
              id="body"
              placeholder="Message Body"
              name="body"
              aria-describedby="my-helper-text"
              value={messageForm.body}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Box>
   
  );
}
