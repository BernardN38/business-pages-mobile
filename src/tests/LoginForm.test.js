import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import LoginForm from "../Components/LoginForm";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import { BrowserRouter } from "react-router-dom";



it("Checkbox login page displays properly", async () => {
  const initialState = {};
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  const { container } = render(<LoginForm />, {
    wrapper: Wrapper,
  });

  expect(screen.getByText("Username")).toBeInTheDocument();
  expect(screen.getByText("Sign In")).toBeInTheDocument();
});
