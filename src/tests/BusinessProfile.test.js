import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import BusinessProfile from "../Components/BusinessProfile";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import {BrowserRouter} from "react-router-dom";


it("business profile displays properly", async () => {

  const initialState = {
    auth: { authMode: "Business" },
    business: {   business: {
        name: "Test Business",
        business_id: 1,
        business_reviews: [],
      },
      token: {business_id: 1},
      profile: {business_reviews: [{
        body: "i love subway!",
        rating: 4,
        review_id: 215,
        title: "Yummy!",
        user_id: 1,
        user_profile_image:
          "https://cdnb.artstation.com/p/assets/images/images/001/390/295/large/ayhan-aydogan-sprmn.jpg?1445589563",
      },{
        body: "i love subway!",
        rating: 4,
        review_id: 215,
        title: "Yummy!",
        user_id: 1,
        user_profile_image:
          "https://cdnb.artstation.com/p/assets/images/images/001/390/295/large/ayhan-aydogan-sprmn.jpg?1445589563",
      }],},}
  };
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  render(<BusinessProfile />, {
    wrapper: Wrapper,
  });


  expect(screen.getByText("Reviews: 2")).toBeInTheDocument();
  expect(screen.getByText("Average Rating: 4")).toBeInTheDocument();
  expect(screen.getByText("Edit Profile")).toBeInTheDocument();
  

});
