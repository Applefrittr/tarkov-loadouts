import "../Styles/Home.css";
import AnimatePage from "./AnimatePage";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <AnimatePage>
      <section className="home-container">
        <div className="hideout-overlay">
            <p>This is the Home Page!</p>
            <Link to="/randomizer"><button id="scav-button" className="hideout-buttons">Scav Box</button></Link>
            <button id="med-button" className="hideout-buttons">Med Station</button>
            <button id="intel-button" className="hideout-buttons">Intel Desk</button>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Home;
