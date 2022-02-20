import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Main from "./Components/Main";
import BusinessPage from "./Components/BusinessPage";
import UserProfile from "./Components/UserProfile";
import LoginForm from "./Components/LoginForm";
import UserEditForm from "./Components/UserEditForm";
import SignupForm from "./Components/SignupForm";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import Homepage from "./Components/Homepage";
import Category from "./Components/Category";
import BusinessForm from "./Components/BusinessForm";
import BusinessLogin from "./Components/BusinessLogin";
import BusinessProfile from "./Components/BusinessProfile";
import BusinessEditForm from "./Components/BusinessEditForm";
import BusinessProfileOfferings from "./Components/BusinessProfileOfferings";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Main />}>
          <Route index element={<Homepage />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/business/signup" element={<BusinessForm />} />
          <Route path="/business/login" element={<BusinessLogin />} />
          <Route path="/category/:business_type" element={<Category />} />
          <Route path="/business/:id" element={<BusinessPage />} />
          {/* private pages */}
          <Route path="/profile" element={<PrivateOutletUser />}>
            <Route index element={<UserProfile />} />
            <Route path="/profile/edit" element={<UserEditForm />} />
          </Route>
          <Route path="/profile" element={<PrivateOutletBusiness />}>
            <Route path="/profile/business" element={<BusinessProfile />} />
            <Route path='/profile/business/edit' element={<BusinessEditForm/>}/>
            <Route path='/profile/business/offerings' element={<BusinessProfileOfferings/>}/>
          </Route>
          {/* <Route
          path="/private-nested"
          element={
            <PrivateRoute>
              <UserProfile/>
            </PrivateRoute>
          }
        /> */}
          <Route path="/login" element={<LoginForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function PrivateOutletUser() {
  const auth = useAuth();
  return auth === "user" ? <Outlet /> : <Navigate to="/login" />;
}
function PrivateOutletBusiness() {
  const auth = useAuth();
  return auth === "business" ? <Outlet /> : <Navigate to="/business/login" />;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  const authMode = useSelector((state)=> state.auth.authMode)
  console.log(authMode)
  if (authMode == 'user') {
    return "user";
  } else if (authMode == 'business') {
    return "business";
  } else {
    return false;
  }
}
