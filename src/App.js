import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  Navigate,
  Outlet
} from "react-router-dom";
import Main from './Components/Main'
import BusinessPage from "./Components/BusinessPage";
import UserProfile from "./Components/UserProfile";
import LoginForm from './Components/LoginForm'
import UserEditForm from "./Components/UserEditForm";
import SignupForm from "./Components/SignupForm";
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from "react-redux";
import Homepage from "./Components/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public pages */}
        <Route path="/" element={<Main/>}>
        <Route index element={<Homepage/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        {/* private pages */}
        <Route path="/profile" element={<PrivateOutlet />}>
          <Route index element={<UserProfile/> } />
          <Route path="/profile/edit" element={<UserEditForm/> } />
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


function PrivateOutlet() {
  const auth = useAuth();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  const user = useSelector((state) => state.user.user);
  if (user.token){
    return true
  } else {
    return false
  }
}
