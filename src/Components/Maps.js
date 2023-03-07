import { useEffect, useRef } from "react";
import "../Styles/Maps.css";
import { AllMaps } from "../Assets/DialogObj";

const Maps = (props) => {
  const mapArray = [];
  const ref = useRef([]);

  const vetoMap = (e) => {
    console.log(e.target)
    e.target.parentNode.classList.toggle("disabled");
  };

    console.log(AllMaps);
    props.mapData.forEach((map, i) => {
      let index;
      for (let a = 0; a < AllMaps.length; a++) {
        if (AllMaps[a].name === map.name) {
          index = a;
          break;
        }
      }
      console.log(index, map.name);
      const currMap = AllMaps[index];
      mapArray.push(
        <div
          className="map-slot"
          ref={(el) => (ref.current[i] = el)}
          key={i}
          onClick={vetoMap}
        >
          <div className="gear-label">{map.name}</div>
          <img src={currMap.img} className="map-icon"></img>
        </div>
      );
    });


  const randomMap = (e) => {
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
        return;
      }
      interval += 7;
      ref.current.forEach((ref) => ref.classList.remove("selected"));
      let rand = Math.floor(Math.random() * mapArray.length);
      if (rand === prevRand) rand = Math.floor(Math.random() * mapArray.length);
      while (ref.current[rand].classList.contains("disabled")) {
        rand = Math.floor(Math.random() * mapArray.length);
      }
      ref.current[rand].classList.add("selected");
      prevRand = rand;
      setTimeout(ease, interval);
    };

    ease();
  };

  return (
    <section id="maps-container">
      <div id="map-grid">{mapArray}</div>
      <button onClick={randomMap}>Test</button>
    </section>
  );
};

export default Maps;
