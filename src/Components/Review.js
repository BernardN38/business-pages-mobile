import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Collapse from "@mui/material/Collapse";
import ReviewReply from "./ReviewReply";
import Box from '@mui/material/Box'
import ReviewReplies from "./ReviewReplies";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Review({
  reviewBody,
  username,
  title,
  rating,
  reviewId,
  userProfileImage,
}) {
  const [open, setOpen] = useState(false);
  const authMode = useSelector((state) => state.auth.authMode);
  return (
    <div className="p-2">
      <Card sx={{ minWidth: 275 }} className="border border-dark">
        <CardContent>
          <Stack direction="row" className="d-flex align-items-center">
            <Avatar src={userProfileImage} />
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              className="pr-2"
            >
              {username}
            </Typography>
          </Stack>
          <Rating name="read-only" value={rating} readOnly />
          <Typography
            style={{ fontWeight: "bold" }}
            sx={{ fontSize: 14 }}
            color="text.dark"
          >
            {title}
          </Typography>

          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            {reviewBody}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setOpen(!open);
            }}
            size="small"
          >
            Reply
          </Button>
        </CardActions>
        <Collapse in={open} timeout="auto" unmountOnExit>
          {authMode != null ? (
            <ReviewReply reviewId={reviewId} />
          ) : (
            <Box sx={{pl:'1rem'}}>
              <Typography>
                <Link to="/login"> Login to reply</Link>
              </Typography>
            </Box>
          )}

          <ReviewReplies reviewId={reviewId} />
        </Collapse>
      </Card>
    </div>
  );
}
