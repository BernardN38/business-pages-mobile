import React from "react";
import {  render, screen } from "@testing-library/react";
import UserProfile from "../Components/UserProfile";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import {BrowserRouter} from "react-router-dom";



it("Checkbox user profile displays properly", async () => {

  const initialState = {
    auth: { authMode: "User" },
    user: {
        user: {token:{user_id:1}},
        userData: {username:"Test User", score: 10, reviews: [] },
        rank: null,
        messages: [],
      }
  };
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  render(<UserProfile />, {
    wrapper: Wrapper,
  });

  expect(screen.getByText("Test User")).toBeInTheDocument();
  expect(screen.getByText("Edit Profile")).toBeInTheDocument();
  expect(screen.getByText("Inbox")).toBeInTheDocument();
  expect(screen.getByText("Score: 10")).toBeInTheDocument();
  

});
