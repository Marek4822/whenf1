import React from 'react';

const NextRace = ({ nextRace, timeLeft }) => {
  return (
    <div className="card">
      <h2>Next Race</h2>
      <p>{nextRace.grandPrix}</p>
      <p>Date: {nextRace.date}</p>
      <p>Time: {nextRace.time}</p>
      <p className="timer">
        Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
};

export default NextRace;