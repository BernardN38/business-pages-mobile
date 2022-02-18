import React, {useState} from "react";
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box" 
import axios from 'axios';
import config from "../config";

export default function ReviewReply({reviewId}) {
    const [reply, setReply] = useState({body:''});
    console.log(reviewId)
    const handleClick = (e) =>{
        const json = JSON.stringify(reply)
        console.log(json)
       axios.post(`${config.serverUrl}/api/review/${reviewId}/reply`, json, {withCredentials: true, baseURL:'http://localhost:3000', headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }} ).then((resp)=>{
           console.log(resp.data)
       })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log({name,value})
        setReply({[name]:value});
      };
  return (
    <Stack direction="row" >
      <TextField
        id="filled-helperText"
        label="Reply"
        name="body"
        variant="filled"
        value={reply.body}
        onChange={handleChange}
        fullWidth
      />
      <Box  >
        <Button onClick={handleClick} type="submit" sx={{height:"100%"}} variant="contained" endIcon={<SendIcon />}>
          Send
        </Button>
      </Box>
    </Stack>
  );
}
