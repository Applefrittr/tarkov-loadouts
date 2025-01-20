import { useRef, useState } from "react";
import { Tracks } from "../data/TrackData";
import "../Styles/Stereo.css";
import Play from "../Assets/play.png";
import Pause from "../Assets/pause.png";
import Volume from "../Assets/volume.png";

const Stereo = ({ stereo }) => {
  const stereoRef = useRef();
  const [volume, setVolume] = useState(50);
  const [playing, setPlaying] = useState(false);

  const updateVolume = (e) => {
    setVolume(e.target.value);
    stereoRef.current.volume = e.target.value / 100;
  };

  const togglePlay = () => {
    setPlaying((prev) => {
      if (prev) stereoRef.current.pause();
      else stereoRef.current.play();
      return !prev;
    });
  };

  return (
    <div
      className="stereo-container"
      style={{ display: `${stereo ? "flex" : "none"}` }}
    >
      <p>{Tracks[0].name}</p>
      <audio loop ref={stereoRef}>
        <source src={Tracks[0].track}></source>
      </audio>
      <div className="stereo-controls">
        {!playing && (
          <button onClick={togglePlay} className="stereo-btn">
            <img src={Play} alt="Play" />
          </button>
        )}
        {playing && (
          <button onClick={togglePlay} className="stereo-btn">
            <img src={Pause} alt="Pause" />
          </button>
        )}
        <div className="volume-container">
          <img src={Volume} alt="" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={updateVolume}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default Stereo;
