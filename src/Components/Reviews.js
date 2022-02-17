import React, { useEffect, useState } from 'react';
import Review from "./Review";
import Stack from '@mui/material/Stack';
import ReviewModal from "./ReviewModal";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import config from '../config';
function Reviews() {
  const business = useSelector(state => state.business.business)
  const reviewList = useSelector(state => state.reviews.reviewList);
  const dispatch = useDispatch()


  useEffect(()=>{
    axios.get(`${config.serverUrl}/api/business/${business.business_id}`).then((resp)=>{
      dispatch({type:'SET_REVIEWS',payload:resp.data.business_reviews});
      console.log(resp.data.business_reviews)
    })

  },[])  

  return (
    <Stack >
      <ReviewModal  />
      {reviewList.map((review,idx)=>{
        return <Review key={review.review_id} reviewId={review.review_id} userProfileImage={review.user_profile_image} reviewBody={review.body} title={review.title} rating={review.rating}/>
      })}
    </Stack>
  )

}

export default Reviews;
