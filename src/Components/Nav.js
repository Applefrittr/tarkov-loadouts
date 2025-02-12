import { Link } from "react-router-dom";
import "../Styles/Nav.css";
import Logo from "../Assets/silhouette.png";
import { useState } from "react";
import Git from "../Assets/gitWHITE.png";
import Stereo from "./Stereo";

const Nav = () => {
  const [about, setAbout] = useState(false);
  const [stereo, setStereo] = useState(false);

  const toggleAbout = () => {
    setAbout((prev) => !prev);
  };

  const toggleStereo = () => {
    setStereo((prev) => !prev);
  };

  return (
    <section className="navbar">
      <Link to="/" tabIndex="-1" className="nav-header">
        <img src={Logo} alt="" className="nav-logo"></img>
        <h1>Tarkov Loadouts</h1>
      </Link>
      <div className="nav-button-container">
        <button className="nav-buttons" onClick={toggleStereo}>
          Stereo
        </button>
        <Stereo stereo={stereo} />
        <button className="nav-buttons" onClick={toggleAbout}>
          About
        </button>
      </div>
      {about === true && (
        <section id="about-section">
          <div id="about-container">
            <p>
              Tarkov Loadouts is a companion App to Battle State Game's{" "}
              <a
                href="https://www.escapefromtarkov.com/"
                target="_blank"
                rel="noreferrer"
              >
                Escape from Tarkov
              </a>
              . Designed with randomization in mind, players can use it create
              unique loadouts for their in-game raids. Features include
              randomized gear, medical injector combinations, and a random map
              selector.
            </p>
            <p>
              Item images and descriptions curtesy of{" "}
              <a href="https://tarkov.dev/" target="_blank" rel="noreferrer">
                Tarkov.dev
              </a>{" "}
              and the{" "}
              <a
                href="https://escapefromtarkov.fandom.com/wiki/Escape_from_Tarkov_Wiki"
                target="_blank"
                rel="noreferrer"
              >
                Tarkov Wiki
              </a>
              .
            </p>
            <p>Background images captured in-game.</p>
            <div id="about-created-by">
              Created March 2023 by Applefrittr
              <a
                href="https://github.com/Applefrittr/tarkov-loadouts"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Git} alt="GitHub Applefrittr" id="git-icon" />
              </a>
            </div>
            <div id="ip-credit">
              Game content and materials are trademarks and copyright of Battle
              State Games and its licensors. All rights reserved.
            </div>
            <button onClick={toggleAbout} id="getGear-button">
              Close
            </button>
          </div>
        </section>
      )}
    </section>
  );
};

export default Nav;
