import "./App.css";
import Narbar from "./Components/Navbar";
import SimpleSnackbar from "./Components/Snackbar";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Outlet } from "react-router-dom";
function App() {

  return (
    <div> 
      <Narbar />
      <Outlet/>
      <SimpleSnackbar />
    </div>
  );
}

export default App;
