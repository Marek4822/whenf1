import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NextRace from './components/NextRace';
import NextEvent from './components/NextEvent';
import GrandPrixButton from './components/GrandPrixButton';
import F1_DATA from './data/f1Data';
import './styles.css';

const App = () => {
  const [nextRace, setNextRace] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const today = new Date();
    let closestRace = null;
    let closestEvent = null;
    let closestRaceDiff = Infinity;
    let closestEventDiff = Infinity;

    F1_DATA.GrandsPrix.forEach((grandPrix) => {
      grandPrix.events.forEach((event) => {
        const eventDate = new Date(`${event.date} ${today.getFullYear()} ${event.time}`);
        const diff = eventDate - today;

        if (diff > 0) {
          // Find the next race
          if (event.type === "Grand Prix" && diff < closestRaceDiff) {
            closestRaceDiff = diff;
            closestRace = { ...event, grandPrix: grandPrix.name };
          }

          // Find the next event (any type)
          if (diff < closestEventDiff) {
            closestEventDiff = diff;
            closestEvent = { ...event, grandPrix: grandPrix.name };
          }
        }
      });
    });

    setNextRace(closestRace);
    setNextEvent(closestEvent);

    // Start the countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const raceDate = new Date(`${closestRace.date} ${now.getFullYear()} ${closestRace.time}`);
      const raceDiff = raceDate - now;

      const raceTimeLeft = {
        days: Math.floor(raceDiff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((raceDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((raceDiff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((raceDiff % (1000 * 60)) / 1000),
      };

      setTimeLeft(raceTimeLeft);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className="app">
      <Header />
      <NextRace nextRace={nextRace} timeLeft={timeLeft} />
      <NextEvent nextEvent={nextEvent} />
      <GrandPrixButton data={F1_DATA} />
    </div>
  );
};

export default App;