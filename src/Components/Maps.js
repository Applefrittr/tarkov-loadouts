import { useRef, useState } from "react";
import "../Styles/Maps.css";
import { AllMaps } from "../Assets/DataObjects";
import AnimatePage from "./AnimatePage";
import { Dialog } from "../Assets/DataObjects";
import Skier from "../Assets/skier.jpg";
import { AnimatePresence, motion } from "framer-motion";

// Maps component renders out a grid with images of the maps in Escape from Tarkov.  Once the user clicks the button in the UI, a map is picked at random from the grid
const Maps = (props) => {
  const mapArray = [];
  const ref = useRef([]); // ref is an array of useRef pointers, used to identify each unique map image
  const [displayErr, setDisplayErr] = useState(false);

  // onClick function on each map image.  Toggles "disabled" class which removes that particular map from the randomizer
  const vetoMap = (e) => {
    e.target.parentNode.classList.toggle("disabled");
    setDisplayErr(false);
  };

  // iterates through each map object retrieved from the dataset retrieved from the api fetch call in RoutePaths.js and compares it to an object in DialogObects.js to
  // retrieve map thumbnails (no map image references in the api, so this image files were downloaded into the app).  Creates markup for each map image and pushes
  // it into the mapArray variable to be rendered
  props.mapData.forEach((map, i) => {
    let index;
    for (let a = 0; a < AllMaps.length; a++) {
      if (AllMaps[a].name === map.name) {
        index = a;
        break;
      }
    }
    const currMap = AllMaps[index];
    mapArray.push(
      <div
        className="map-slot"
        ref={(el) => (ref.current[i] = el)} // ref assignment into the ref array
        key={i}
        onClick={vetoMap}
      >
        <div className="gear-label">{map.name}</div>
        <img src={currMap.img} className="map-icon" alt={currMap.name}></img>
      </div>
    );
  });

  // This is the visual randomizer effect which will highlight a maps at random until a certain time interval is reached.  SetInterval is used to keep track of the time in
  // seconds and is used as our breaking condition in the recursive calls of the ease() function
  const randomMap = (e) => {
    if (
      ref.current.every((element) => element.classList.contains("disabled"))
    ) {
      setDisplayErr(true);
      return;
    }
    e.target.disabled = true;
    let interval = 50;
    let time = 0;
    let prevRand;

    setInterval(() => {
      time++;
    }, 1000);

    const ease = () => {
      if (time === 6) {
        e.target.disabled = false;
        setTimeout(() => {
          ref.current[prevRand].classList.add("winner");
        }, 250);
        return;
      }
      interval += 7;
      ref.current.forEach((ref) => ref.classList.remove("selected"));
      ref.current.forEach((ref) => ref.classList.remove("winner"));
      let rand = Math.floor(Math.random() * mapArray.length);
      while (rand === prevRand) {
        rand = Math.floor(Math.random() * mapArray.length);
      }
      while (ref.current[rand].classList.contains("disabled")) {
        rand = Math.floor(Math.random() * mapArray.length);
      }
      ref.current[rand].classList.add("selected");
      prevRand = rand;
      setTimeout(ease, interval);
    };

    ease();
  };

  // UI rendered in 2 two planes: dialog box on the left plane and map grid on the right plane.  Responsive design implemented in Maps.css to stack planes on smaller
  // screens.
  return (
    <AnimatePage>
      <section id="maps-container">
        <div className="overlay">
          <div className="overlay-container">
            <div className="dialog-container">
              <header>
                <h1>Skier</h1>
              </header>
              <div id="dialog">
                <div id="dialog-img-text">
                  <div id="vendor-icon">
                    <img src={Skier}></img>
                  </div>
                  <p>{Dialog.Skier}</p>
                </div>
                <div id="dialog-button">
                  <button onClick={randomMap} id="getGear-button">
                    GET CONTRACT
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="overlay-container">
            <div id="map-grid-container">
              <header id="grid-header">
                <h1>Maps</h1>
                <p id="grid-header-tip">click map to veto</p>
              </header>
              <div id="map-grid">{mapArray}</div>
              <footer></footer>
              <AnimatePresence>
                {displayErr && (
                  <motion.div
                    id="map-grid-error"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                  >
                    You must choose at least 1 map
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </AnimatePage>
  );
};

export default Maps;
