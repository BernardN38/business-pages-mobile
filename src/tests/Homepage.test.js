import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Homepage from "../Components/Homepage";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import { BrowserRouter } from "react-router-dom";


it("homepage displays properly", async () => {
  const initialState = {
    auth: { authMode: "User" },
  };
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
  render(<Homepage />, {
    wrapper: Wrapper,
  });

  expect(screen.getByText("Explore Categories")).toBeInTheDocument();
  expect(screen.getByText("Add your business to our pages!")).toBeInTheDocument();
  //   expect(screen.getByText("eat fresh!")).toBeInTheDocument();
  //   expect(screen.getByText("Yummy!")).toBeInTheDocument();
  //   expect(screen.getByText("i love subway!")).toBeInTheDocument();
});
