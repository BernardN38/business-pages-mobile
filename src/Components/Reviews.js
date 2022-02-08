import React, {useState} from 'react';
import Review from "./Review"
function Reviews() {
    const [reviews, setReviews] = useState(["great place to eat with the family"])
  return <div>
      <Review reviewBody={reviews[0]} username="Bernard"/>
      <Review reviewBody={reviews[0]} username="Edna"/>
      <Review reviewBody={reviews[0]} username="Ricky"/>
      <Review reviewBody={reviews[0]} username="Chris"/>
  </div>;
}

export default Reviews;
