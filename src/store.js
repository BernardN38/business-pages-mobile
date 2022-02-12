import { configureStore } from '@reduxjs/toolkit'
import businessReducer  from './redux/businessInfo'
import reviewsReducer from './redux/reviewData'
export default configureStore({
  reducer: {
      business: businessReducer,
      reviews: reviewsReducer,
  },
})