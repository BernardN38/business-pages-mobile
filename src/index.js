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
import { Provider, } from "react-redux";
import { createStore } from "redux";
import RequireAuth from "./Components/RequireAuth";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <RequireAuth>
      <Routes>
          <Route path="/" element={<BusinessPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route element={<RequireAuth />}>
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        
        <Route path="*" element={<BusinessPage />} />
      </Routes>
    </RequireAuth>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
