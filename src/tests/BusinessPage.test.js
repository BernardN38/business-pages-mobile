import React from "react";
import {  render, screen } from "@testing-library/react";
import BusinessPage from "../Components/BusinessPage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";



it("business page displays properly", async () => {
  const initialState = {
    auth: { authMode: "User" },
    business: {
      business: {
        business_id: 6,
        messaging_id: 39,
        name: "subway",
        description: "eat fresh!",
        business_type: "food",
        phone_number: "1234567890",
        profile_image_url:
          "https://assets.simpleviewinc.com/simpleview/image/upload/crm/nacogdoches/subway_logo_og-1--552935d35056b3a_5529377f-5056-b3a8-49e770490bdbae60.png",
        rating: null,
        address: "123 main street",
        business_offerings: [],
        business_reviews: [],
        carousel_images: [],
      },
    },
    reviews: {
      reviewList: [
        {
          body: "i love subway!",
          rating: 4,
          review_id: 215,
          title: "Yummy!",
          user_id: 1,
          user_profile_image:
            "https://cdnb.artstation.com/p/assets/images/images/001/390/295/large/ayhan-aydogan-sprmn.jpg?1445589563",
        },
      ],
    },
  };
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  render(<BusinessPage business={initialState.business.business} />, {
    wrapper: Wrapper,
  });

  expect(screen.getByText("subway")).toBeInTheDocument();
  expect(screen.getByText("eat fresh!")).toBeInTheDocument();
  expect(screen.getByText("Yummy!")).toBeInTheDocument();
  expect(screen.getByText("i love subway!")).toBeInTheDocument();
  

});
