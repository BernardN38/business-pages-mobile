import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import axios from "axios";
import config from "../config";
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
    <div>
      {replies.map((reply) => {
        return (
          <div>
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
          </div>
        );
      })}
    </div>
  );
}
