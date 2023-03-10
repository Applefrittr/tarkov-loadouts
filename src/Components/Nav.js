import { Link } from "react-router-dom";
import "../Styles/Nav.css";
import Logo from "../Assets/silhouette.png";
import { useRef } from "react";
import Git from "../Assets/gitWHITE.png"

const Nav = () => {
  const aboutRef = useRef();

  const displayAbout = () => {
    aboutRef.current.style.display = "flex";
  };

  const hideAbout = () => {
    aboutRef.current.style.display = "none";
  };

  return (
    <section className="navbar">
      <div className="nav-header">
        <img src={Logo}></img>
        <h1>Tarkov Loadouts</h1>
      </div>
      <div className="nav-button-container">
        <Link to="/">
          <button className="nav-buttons">Hideout</button>
        </Link>
        <button className="nav-buttons" onClick={displayAbout}>
          About
        </button>
      </div>
      <section id="about-section" ref={aboutRef}>
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
            unique loadouts for their in-game raids. Features include randomized
            gear, medical injector combinations, and a random map selector.
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
            <a href="https://github.com/Applefrittr" target="_blank" rel="noreferrer">
              <img src={Git} alt="GitHub Applefrittr" id="git-icon"/>
            </a>
          </div>
          <div id="ip-credit">Game content and materials are trademarks and copyright of Battle State Games and its licensors.  All rights reserved.</div>
          <button onClick={hideAbout} id="getGear-button">
            Close
          </button>
        </div>
      </section>
    </section>
  );
};

export default Nav;
