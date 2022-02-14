import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import LoginForm from "./Components/LoginForm";
import BusinessPage from "./Components/BusinessPage";
import UserProfile from "./Components/UserProfile";
import UserEditForm from "./Components/UserEditForm";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import RequireAuth from "./Components/RequireAuth";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<BusinessPage />} />
            <Route path="/login" element={<LoginForm />} />

            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <UserProfile />
                </RequireAuth>
              }
            />

            <Route path="/profile/edit" element={<UserEditForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
