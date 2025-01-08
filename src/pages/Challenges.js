import AnimatePage from "../Components/AnimatePage";
import "../Styles/Challenges.css";
import { Dialog } from "../Assets/DataObjects";
import challengedata from "../json/challenges.json";
import { useState } from "react";
import Scav from "../Assets/scav.png";
import Jaeger from "../Assets/Jaeger.jpg";

const Challenges = () => {
  const [flipped, setFlipped] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [challenge, setChallenge] = useState(getRandomChallenge());

  const getChallenge = (e) => {
    e.target.disabled = true;
    setShowCard(false);
    setTimeout(() => {
      setFlipped(false);
      setTimeout(() => {
        setChallenge(getRandomChallenge());
        setShowCard(true);
        e.target.disabled = false;
      }, 500);
    }, 1000);
  };

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
                  <button id="getGear-button" onClick={(e) => getChallenge(e)}>
                    GET CHALLENGE
                  </button>
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
                <div
                  className={`card-placeholder ${showCard ? "" : "hide-card"}`}
                  onClick={flip}
                >
                  <div className="card-sleeve">
                    <div className={`card ${flipped ? "" : "flip"}`}>
                      <div className="front card-face">
                        <p>{challenge.name}</p>
                        <p>{challenge.text}</p>
                      </div>
                      <div className="back card-face">
                        <img src={Scav} alt="scav icon" />
                      </div>
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

function getRandomChallenge() {
  return Object.values(challengedata)[
    Math.floor(Math.random() * Object.values(challengedata).length)
  ];
}
