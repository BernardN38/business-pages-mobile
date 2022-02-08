import "./App.css";
import Narbar from "./Components/Navbar";
import ControlledCarousel from "./Components/Carousel";
import BusinessHeader from "./Components/BusinessHeader";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import BusinessTabs from "./Components/BusinessTabs.js"
function App() {
  return (
    <div> 
      <Narbar />
      <ControlledCarousel />
      <BusinessHeader />
      <BusinessTabs/>
    </div>
  );
}

export default App;
