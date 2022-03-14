import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import BusinessHeader from "../Components/BusinessHeader";
import { createStore } from "redux";
import { Provider } from "react-redux";
import authReducer from "../reducers/authReducer";
import businessReducer from "../reducers/businessReducer";
import { combineReducers } from "redux";

//Combine all the sub reducers
const rootReducer = combineReducers({
  business: businessReducer,
  auth: authReducer,
});
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it("Checkbox business header displays properly", async () => {
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
  };
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  render(<BusinessHeader business={initialState.business.business} />, {
    wrapper: Wrapper,
  });
  console.log()
  expect(screen.getByText("subway")).toBeInTheDocument();
  expect(screen.getByText("eat fresh!")).toBeInTheDocument();
  // expect(getByLabelText('description')).toBeTruthy();
});
