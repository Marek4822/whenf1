import React from 'react';
import Timer from './Timer'

const NextEvent = ({ nextEvent, timeLeft }) => {
  return (
    <div className="bg-f1-next rounded-xl shadow-f1-card p-6 mb-6 ">
      <h2 className="text-2xl font-semibold mb-4 text-f1-text">Next Event</h2>
      <p className="text-f1-text">{nextEvent.type}</p>
      <p className="text-f1-text mb-2">Grand Prix: {nextEvent.grandPrix}</p>
      <p className="text-f1-gray">Date: {nextEvent.date}</p>
      <p className="text-f1-gray mb-4">Time: {nextEvent.time}</p>
      <Timer timeLeft={timeLeft} />
    </div>
  );
};

export default NextEvent;