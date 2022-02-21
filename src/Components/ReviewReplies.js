import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box'
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import config from "../config";
import {v4 as uuid} from 'uuid';
export default function ReviewReplies({ reviewId }) {
  const [replies, setReplies] = useState([]);
  const instance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000/",
  });
  useEffect(() => {
    instance
      .get(`${config.serverUrl}/api/review/${reviewId}/replies`)
      .then((resp) => {
        setReplies(resp.data);
        console.log(resp.data);
      });
  }, []);
  return (
    <Box padding='2px'>
      {replies.map((reply,idx) => {
        if (idx>4) return 
        return (
          <Box key={uuid()} sx={{borderTop:'1px solid black',borderBottom:'1px solid black', borderRadius:'2px', margin:'3px'}}>
            <CardContent>
              <Stack direction="row" className="d-flex align-items-center">
                <Avatar src={reply.profile_image_url} />
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  className="pr-2"
                >
                  {reply.username}
                </Typography>
              </Stack>

              <Typography sx={{ fontSize: 14 }} color="text.secondary">
                {reply.body}
              </Typography>
            </CardContent>
          </Box>
        );
      })}
    </Box>
  );
}
