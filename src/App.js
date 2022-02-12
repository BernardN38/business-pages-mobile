import "./App.css";
import Narbar from "./Components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Outlet } from "react-router-dom";
function App() {
  return (
    <div> 
      <Narbar />
      <Outlet/>
    </div>
  );
}

export default App;
