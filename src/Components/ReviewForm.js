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
import Rating from "@mui/material/Rating";
import { useSelector, useDispatch } from "react-redux";
import config from "../config";

function ReviewForm({ open, setOpen }) {
  const [reviewForm, setReviewForm] = useState({
    title: "",
    body: "",
    rating: 0,
  });
  const business = useSelector((state) => state.business.business);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    const json = JSON.stringify(reviewForm);
    axios
      .post(
        `${config.serverUrl}/api/business-review/${business.business_id}`,
        json,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setOpen(!open);
        axios
          .get(`${config.serverUrl}/api/business/${business.business_id}`)
          .then((resp) => {
            dispatch({
              type: "SET_REVIEWS",
              payload: resp.data.business_reviews,
            });
            // navigate("/");
          });
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({
      ...reviewForm,
      [name]: value,
    });
  };
  return (
    <form>
      <Box sx={{ borderBottom: 1 }}>
        <Box
          id="transition-modal-title"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Rating
            size="large"
            name="rating"
            value={+reviewForm.rating}
            onChange={handleInputChange}
          />
        </Box>
        <Stack sx={{ m: 1 }}>
          <Typography sx={{ textAlign: "center" }} variant="h6">
            Write a Review
          </Typography>
          <FormControl>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              id="title"
              aria-describedby="my-helper-text"
              name="title"
              value={reviewForm.title}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl sx={{ marginTop: 1 }}>
            <InputLabel htmlFor="body" />
            <TextField
              multiline={true}
              minRows={10}
              id="body"
              placeholder="Review Body"
              name="body"
              aria-describedby="my-helper-text"
              value={reviewForm.body}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Box>
    </form>
  );
}

export default ReviewForm;
