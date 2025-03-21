import React from 'react';
import Timer from './Timer';

const NextRace = ({ nextRace, timeLeft }) => {
  if (!nextRace) return null;

  return (
    <div className="card">
      <h2>Next Race</h2>
      <p>{nextRace.grandPrix}</p>
      <p>Date: {nextRace.date}</p>
      <p>Time: {nextRace.time}</p>
      <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default NextRace;