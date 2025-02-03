import { Link } from "react-router-dom";
import "../Styles/NoPage.css";

const NoPage = () => {
  return (
    <section id="nopage-container">
      <div className="nopage-elements">
        <h2>It's safe inside the Hideout</h2>
        <p>404 - Page not found</p>
        <Link to="/" id="getGear-button" className="nopage-btn">
          Return
        </Link>
      </div>
    </section>
  );
};

export default NoPage;
