const Timer = ({ timeLeft }) => {
  return (
    <div className="text-f1-blue font-semibold mt-3">
    <p>
      Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
      {/* Time Left: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s */}

    </p>
  </div>
  );
};

export default Timer;