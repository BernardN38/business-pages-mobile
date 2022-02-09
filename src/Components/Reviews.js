import React, {useState} from 'react';
import Review from "./Review"
function Reviews() {
    const [reviews, setReviews] = useState(["great place to eat with the family"])
  return <div>
      <Review reviewBody={reviews[0]} username="Bernard Narvaez"/>
      <Review reviewBody={reviews[0]} username="Edna Pina"/>
      <Review reviewBody={reviews[0]} username="Ricky Reyes"/>
      <Review reviewBody={reviews[0]} username="Chris Flores"/>
  </div>;
}

export default Reviews;
