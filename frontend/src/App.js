import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NextRace from './components/NextRace';
import NextEvent from './components/NextEvent';
import GrandPrixButton from './components/GrandPrixButton';
import F1_DATA from './data/f1Data';
import ScrollButtons from './components/ScrollButtons';
import './styles.css';

const App = () => {
  const [nextRace, setNextRace] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [raceTimeLeft, setRaceTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventTimeLeft, setEventTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Find the next race and next event
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
  }, []);

  // Update the countdown timer for the next race
  useEffect(() => {
    if (nextRace) {
      const timer = setInterval(() => {
        const now = new Date();
        const raceDate = new Date(`${nextRace.date} ${now.getFullYear()} ${nextRace.time}`);
        const diff = raceDate - now;

        setRaceTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount
    }
  }, [nextRace]);

  // Update the countdown timer for the next event
  useEffect(() => {
    if (nextEvent) {
      const timer = setInterval(() => {
        const now = new Date();
        const eventDate = new Date(`${nextEvent.date} ${now.getFullYear()} ${nextEvent.time}`);
        const diff = eventDate - now;

        setEventTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }, 1000);

      return () => clearInterval(timer); // Cleanup timer on unmount
    }
  }, [nextEvent]);

  return (
    <div className="app">
      <Header />
      {nextRace && (
        <NextRace nextRace={nextRace} timeLeft={raceTimeLeft} />
      )}
      {nextEvent && nextEvent.type !== "Grand Prix" && (
        <NextEvent nextEvent={nextEvent} timeLeft={eventTimeLeft} />
      )}
      <GrandPrixButton />



      <ScrollButtons />
    </div>
  );
};

export default App;