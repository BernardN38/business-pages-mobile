import React  from "react";
import Review from "./Review";
import Stack from "@mui/material/Stack";
import ReviewModal from "./ReviewModal";
import {v4 as uuid} from 'uuid';
import { useSelector} from "react-redux";

function Reviews() {
  const reviewList = useSelector((state) => state.reviews.reviewList);
  const authMode = useSelector((state) => state.auth.authMode);
  return (
    <Stack>
      {authMode === 'user' ? <ReviewModal />: ''}
      {reviewList.map((review) => {
        return (
          <Review
            key={uuid()}
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
