import React, { useEffect, useState } from "react";
import Review from "./Review";
import Stack from "@mui/material/Stack";
import ReviewModal from "./ReviewModal";

import { useSelector, useDispatch } from "react-redux";

function Reviews() {
  const reviewList = useSelector((state) => state.reviews.reviewList);

  return (
    <Stack>
      <ReviewModal />
      {reviewList.map((review, idx) => {
        return (
          <Review
            key={review.review_id}
            reviewId={review.review_id}
            userProfileImage={review.user_profile_image}
            reviewBody={review.body}
            title={review.title}
            rating={review.rating}
          />
        );
      })}
    </Stack>
  );
}

export default Reviews;
