import Hideout from "../Assets/tracks/hideout.wav";

const Stereo = ({ stereo }) => {
  return (
    <div
      className="stereo-controls"
      style={{ display: `${stereo ? "block" : "none"}` }}
    >
      <p>The Hideout - Gamerway10</p>
      <audio controls loop>
        <source src={Hideout}></source>
      </audio>
    </div>
  );
};

export default Stereo;
