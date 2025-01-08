import AnimatePage from "../Components/AnimatePage";
import "../Styles/Challenges.css";
import { Dialog } from "../Assets/DataObjects";
import challengedata from "../json/challenges.json";
import { useState } from "react";
import Scav from "../Assets/scav.png";
import Jaeger from "../Assets/Jaeger.jpg";

const Challenges = () => {
  const [flipped, setFlipped] = useState(false);
  console.log(challengedata);
  console.log(Object.values(challengedata));

  const flip = () => {
    setFlipped((prev) => !prev);
    console.log("flipped!");
  };

  return (
    <AnimatePage>
      <section id="challenges-container">
        <div className="overlay">
          <div className="overlay-container">
            <div className="dialog-container">
              <header>
                <h1>Jaeger</h1>
              </header>
              <div id="dialog">
                <div id="dialog-img-text">
                  <div id="vendor-icon">
                    <img src={Jaeger} alt="Jaeger"></img>
                  </div>
                  <p>{Dialog.Jaeger}</p>
                </div>
                <div id="dialog-button">
                  <button id="getGear-button">GET CHALLENGE</button>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div className="challenge-card-container">
              <header>
                <h1>Challenge Card</h1>
              </header>
              <div className="challenge-card">
                <div className="card-sleeve">
                  <div
                    className={`card ${flipped ? "" : "flip"}`}
                    onClick={flip}
                  >
                    <div className="front card-face">Front</div>
                    <div className="back card-face">
                      <img src={Scav} alt="scav icon" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Challenges;
