import React from 'react';
import Timer from './Timer'

const NextRace = ({ nextRace, timeLeft }) => {
  return (
    <div className="bg-f1-next rounded-xl shadow-f1-card p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4 text-f1-text">Next Race</h2>
      <p className="text-f1-text mb-2">{nextRace.grandPrix}</p>
      <p className="text-f1-gray">Date: {nextRace.date}</p>
      <p className="text-f1-gray mb-4">Time: {nextRace.time}</p>
      <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default NextRace;