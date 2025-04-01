import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NextRace from './components/NextRace';
import NextEvent from './components/NextEvent';
import DriverStandings from './components/DriverStandings';
import TeamStandings from './components/TeamStandings';
import GrandPrixButton from './components/GrandPrixButton';
import ScrollButtons from './components/ScrollButtons';
import RefreshButton from './components/RefreshButton';
import { fetchGrandsPrix } from './api/api';
import './index.css';

const App = () => {
  const [nextRace, setNextRace] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [raceTimeLeft, setRaceTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [eventTimeLeft, setEventTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeComponent, setActiveComponent] = useState(null);
  const [grandsPrixData, setGrandsPrixData] = useState({ GrandsPrix: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchGrandsPrix();
        setGrandsPrixData(response);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Find next race and event
  useEffect(() => {
    if (!grandsPrixData.GrandsPrix.length) return;

    const now = new Date();
    let closestRace = null;
    let closestEvent = null;
    let closestRaceDiff = Infinity;
    let closestEventDiff = Infinity;

    grandsPrixData.GrandsPrix.forEach(gp => {
      gp.events.forEach(event => {
        const eventDate = new Date(event.datetime);
        const diff = eventDate - now;

        if (diff > 0 && diff < closestEventDiff) {
          closestEventDiff = diff;
          closestEvent = { ...event, grandPrix: gp.name, datetime: eventDate };
        }

        if (event.type === 'Grand Prix' && diff > 0 && diff < closestRaceDiff) {
          closestRaceDiff = diff;
          closestRace = { ...event, grandPrix: gp.name, datetime: eventDate };
        }
      });
    });

    setNextEvent(closestEvent);
    setNextRace(closestRace);
  }, [grandsPrixData]);

  // Update race countdown
  useEffect(() => {
    if (!nextRace) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextRace.datetime - now;

      setRaceTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((diff % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextRace]);

  // Update event countdown
  useEffect(() => {
    if (!nextEvent) return;

    const timer = setInterval(() => {
      const now = new Date();
      const diff = nextEvent.datetime - now;

      setEventTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((diff % (1000 * 60)) / 1000)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [nextEvent]);

  if (loading) {
    return <div className="p-4 text-center text-gray-600">Loading F1 data...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <Header />
      {nextRace && (
        <NextRace nextRace={nextRace} timeLeft={raceTimeLeft} />
      )}
      {nextEvent && nextEvent.type !== "Grand Prix" && (
        <NextEvent nextEvent={nextEvent} timeLeft={eventTimeLeft} />
      )}
          <div className="space-y-4 mt-6">
          <RefreshButton onRefresh={() => fetchGrandsPrix().then(setGrandsPrixData)} />
          <DriverStandings
            isActive={activeComponent === 'driver'}
            setActive={() => setActiveComponent(prev => prev === 'driver' ? null : 'driver')}
          />
          <TeamStandings
            isActive={activeComponent === 'team'}
            setActive={() => setActiveComponent(prev => prev === 'team' ? null : 'team')}
          />
          <GrandPrixButton
            isActive={activeComponent === 'grandPrix'}
            setActive={() => setActiveComponent(prev => prev === 'grandPrix' ? null : 'grandPrix')}
            grandsPrixData={grandsPrixData}
          />
        </div>
        <ScrollButtons />
      </div>
    </div>
  );
};

export default App;