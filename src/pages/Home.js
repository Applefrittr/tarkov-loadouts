import "../Styles/Home.css";
import AnimatePage from "../Components/AnimatePage.js";
import { Link } from "react-router-dom";
import { Dialog } from "../Assets/DataObjects.js";

// Home component.  Idea is a horizontally scrollable background image with button Links to the various components in the app.  May change UI layout for mobile users
const Home = () => {
  return (
    <AnimatePage>
      <section className="home-container" tabIndex="-1">
        <div className="hideout-overlay">
          <div id="welcome-container">
            <p>{Dialog.Hideout}</p>
          </div>
          <Link to="/loadout" tabIndex="-1">
            <button id="scav-button" className="hideout-buttons">
              Scav Box
            </button>
          </Link>
          <Link to="/maps" tabIndex="-1">
            <button id="intel-button" className="hideout-buttons">
              Intel Desk
            </button>
          </Link>
          <Link to="/meds" tabIndex="-1">
            <button id="med-button" className="hideout-buttons">
              Med Station
            </button>
          </Link>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Home;
