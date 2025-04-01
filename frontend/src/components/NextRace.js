import React from 'react';
import Timer from './Timer'

const NextRace = ({ nextRace, timeLeft }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold mb-4">Next Race</h2>
    <p className="text-gray-700 mb-2">{nextRace.grandPrix}</p>
    <p className="text-gray-600">Date: {nextRace.date}</p>
    <p className="text-gray-600 mb-4">Time: {nextRace.time}</p>
    <Timer timeLeft={timeLeft} />
  </div>
  );
};

export default NextRace;