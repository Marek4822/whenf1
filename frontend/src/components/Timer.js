import React, { useEffect, useState } from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div className="timer">
      <p>
        Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
};

export default Timer;