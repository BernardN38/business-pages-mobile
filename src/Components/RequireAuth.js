import {useAuth}  from "../helpers.js/useAuth";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
export default function RequireAuth({ children }) {
    const { authed } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(authed,children)
    return authed === true ? 
      children
     : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }