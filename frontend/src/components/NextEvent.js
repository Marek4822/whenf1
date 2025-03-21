import React from 'react';

const NextEvent = ({ nextEvent, timeLeft }) => {
  return (
    <div className="card">
      <h2>Next Event</h2>
      <p>{nextEvent.type}</p>
      <p>Grand Prix: {nextEvent.grandPrix}</p>
      <p>Date: {nextEvent.date}</p>
      <p>Time: {nextEvent.time}</p>
      <p className="timer">
        Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
};

export default NextEvent;