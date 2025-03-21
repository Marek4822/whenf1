import React from 'react';

const NextEvent = ({ nextEvent }) => {
  if (!nextEvent || nextEvent.type === 'Grand Prix') return null;

  return (
    <div className="card">
      <h2>Next Event</h2>
      <p>{nextEvent.type}</p>
      <p>Grand Prix: {nextEvent.grandPrix}</p>
      <p>Date: {nextEvent.date}</p>
      <p>Time: {nextEvent.time}</p>
    </div>
  );
};

export default NextEvent;