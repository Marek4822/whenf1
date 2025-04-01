import React from 'react';
import Timer from './Timer'

const NextEvent = ({ nextEvent, timeLeft }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
    <h2 className="text-2xl font-semibold mb-4">Next Event</h2>
    <p className="text-gray-700">{nextEvent.type}</p>
    <p className="text-gray-700 mb-2">Grand Prix: {nextEvent.grandPrix}</p>
    <p className="text-gray-600">Date: {nextEvent.date}</p>
    <p className="text-gray-600 mb-4">Time: {nextEvent.time}</p>
    <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default NextEvent;