import AnimatePage from "../Components/AnimatePage";
import "../Styles/Challenges.css";
import { Dialog } from "../data/DialogData";
import AllChallenges from "../data/challenges.json";
import { useState, useEffect } from "react";
import Scav from "../Assets/scav.png";
import Jaeger from "../Assets/Jaeger.jpg";
import ChallengeTracker from "../Components/ChallengeTracker";

// helper fn that returns a random challenge object out of an array of available challenges.  Param is an array of availble challenge objects
function getRandomChallenge(availableChallenges) {
  if (availableChallenges.length < 1) return undefined;
  return Object.values(availableChallenges)[
    Math.floor(Math.random() * Object.values(availableChallenges).length)
  ];
}

// helper fn that filters out challenges that have not yet been completed from AllChallenges json data.  Param is an array of completed challenge name strings.
function getAvailableChallenges(completedChallenges) {
  const allChallenges = Object.values(AllChallenges);
  return allChallenges.filter((challenge) => {
    return completedChallenges.indexOf(challenge.name) < 0;
  });
}

const rankColor = {
  easy: "#B0D8A4",
  normal: "#C9C9C9",
  hard: "#FEE191",
  expert: "#B23A48",
};

const Challenges = ({ completed, addCompleted, clearCompleted }) => {
  const [flipped, setFlipped] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [available, setAvailable] = useState(getAvailableChallenges(completed));
  const [challenge, setChallenge] = useState(getRandomChallenge(available));

  const getChallenge = (e) => {
    e.target.disabled = true;
    setShowCard(false);
    setTimeout(() => {
      setFlipped(false);
      setTimeout(() => {
        setChallenge(getRandomChallenge(available));
        setShowCard(true);
        e.target.disabled = false;
      }, 500);
    }, 1000);
  };

  const flip = () => {
    setFlipped((prev) => !prev);
  };

  const turnIn = (e) => {
    e.stopPropagation();
    addCompleted(challenge.name);
  };

  useEffect(() => {
    setAvailable(getAvailableChallenges(completed));
  }, [completed]);

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
                  <button id="getGear-button" onClick={getChallenge}>
                    GET CHALLENGE
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div className="challenge-card-container">
              <header id="grid-header">
                <h1>Challenge Card</h1>
                <p id="grid-header-tip">Click to flip card</p>
              </header>
              <div className="challenge-card-subcontainer">
                {challenge && (
                  <div
                    className={`card-placeholder ${
                      showCard ? "" : "hide-card"
                    }`}
                    onClick={flip}
                  >
                    <div className="card-sleeve">
                      <div className={`card ${flipped ? "" : "flip"}`}>
                        <div
                          className="front card-face"
                          style={{
                            backgroundColor: `${
                              rankColor[challenge.difficulty]
                                ? rankColor[challenge.difficulty]
                                : "#C9C9C9"
                            }`,
                            color: `${
                              challenge.difficulty === "expert"
                                ? "white"
                                : "black"
                            }`,
                          }}
                        >
                          <h3>{challenge.name}</h3>
                          <img
                            src={challenge.img}
                            alt="task img"
                            className="challenge-img"
                          />
                          <p>{challenge.objective}</p>
                          <span className="challenge-rank">
                            Difficulty:
                            <img src={challenge.rank} alt="Rank" />
                          </span>
                        </div>
                        <div className="back card-face">
                          <img src={Scav} alt="scav icon" />
                        </div>
                      </div>
                    </div>
                    <button
                      style={{ opacity: `${flipped ? "1" : "0"}` }}
                      id="getGear-button"
                      disabled={flipped ? false : true}
                      onClick={turnIn}
                    >
                      TURN IN
                    </button>
                  </div>
                )}
                {!challenge && <h2>ALL CHALLENGES COMPLETE</h2>}
                <ChallengeTracker
                  challenges={completed}
                  clearCompleted={clearCompleted}
                />
              </div>
              <footer></footer>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Challenges;
