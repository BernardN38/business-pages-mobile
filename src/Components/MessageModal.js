import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Button,
  Input,
  Stack,
  TextField,
} from "@mui/material";
import config from "../config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 325,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

export default function MessageModal({ open, setOpen }) {
  const business = useSelector((state) => state.business.business);
  const [messageForm, setMessageForm] = useState({
    subject: "",
    body: "",
    reciever_id: "",
  });

  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    const data = {
      ...messageForm,
      reciever_id: business.messaging_id,
    };
    const json = JSON.stringify(data);
    axios
      .post(`${config.serverUrl}/api/message`, json, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMessageForm({
      ...messageForm,
      [name]: value,
    });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
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
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
