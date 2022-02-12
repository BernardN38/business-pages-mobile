import React, { useEffect, useState } from 'react';
import Review from "./Review";
import Stack from '@mui/material/Stack';
import ReviewModal from "./ReviewModal";
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';

function Reviews() {
  const business = useSelector(state => state.business.business)
  const reviewList = useSelector(state => state.reviews.reviewList);
  const dispatch = useDispatch()


  useEffect(()=>{
    axios.get(`http://localhost:5000/api/business/${business.business_id}`).then((resp)=>{
      dispatch({type:'SET_REVIEWS',payload:resp.data.business_reviews});
    })
  },[])  

  return (
    <Stack >
      <ReviewModal  />
      {reviewList.map((review,idx)=>{
        return <Review key={idx} reviewBody={review.body} title={review.title} rating={review.rating}/>
      })}
    </Stack>
  )

}

export default Reviews;
