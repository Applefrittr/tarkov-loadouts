const ChallengeTracker = ({ challenges, clearCompleted, total }) => {
  return (
    <section className="challenge-tracker">
      <div className="challenge-tracker-header">
        <h2>
          Completed Challenges {challenges.length}/{total}
        </h2>
        <button id="getGear-button" onClick={clearCompleted}>
          CLEAR
        </button>
      </div>
      <ul>
        {challenges &&
          challenges.map((challenge, i) => {
            return <li key={i}>{challenge}</li>;
          })}
      </ul>
    </section>
  );
};

export default ChallengeTracker;
