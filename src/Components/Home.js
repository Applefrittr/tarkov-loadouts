import "../Styles/Home.css";
import AnimatePage from "./AnimatePage";
import { Link } from "react-router-dom"
import { Dialog } from "../Assets/DataObjects.js"

// Home component.  Idea is a horizontally scrollable background image with button Links to the various components in the app.  May change UI layout for mobile users
const Home = () => {
  return (
    <AnimatePage>
      <section className="home-container">
        <div className="hideout-overlay">
            <div id="welcome-container">
              <p>{Dialog.Hideout}</p>
            </div>
            <Link to="/loadout"><button id="scav-button" className="hideout-buttons">Scav Box</button></Link>
            <Link to="/meds"><button id="med-button" className="hideout-buttons">Med Station</button></Link>
            <Link to="/maps"><button id="intel-button" className="hideout-buttons">Intel Desk</button></Link>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Home;
