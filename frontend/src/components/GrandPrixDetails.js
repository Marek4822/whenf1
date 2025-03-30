import React, { useState } from 'react';
import { fetchDriverResults } from '../api/api';

const GrandPrixDetails = ({ grandPrix, onGoBack }) => {
  const [expandedSession, setExpandedSession] = useState(null);
  const [driverResults, setDriverResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSessionClick = async (sessionType) => {
    if (expandedSession === sessionType) {
      setExpandedSession(null);
    } else {
      setExpandedSession(sessionType);
      setLoading(true);
      setError(null);

      try {
        const results = await fetchDriverResults(grandPrix.name, sessionType);
        setDriverResults(results);
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false);
      }
    }
  };
  const isRaceSession = expandedSession === 'Grand Prix';
  const isSprintRace = expandedSession === 'Sprint';
  const isQualificationSession = expandedSession === 'Qualifying';
  const isSprintQualificationSession = expandedSession === 'Sprint Qualifying';

  return (
    <div className="grand-prix-details">
      <h2>{grandPrix.name}</h2>
      {grandPrix.events.map((event, index) => (
        <div key={index} className="session-container">
          <button
            onClick={() => handleSessionClick(event.type)}
            className="session-button"
          >
            {event.type}: {event.date} at {event.time} {expandedSession === event.type ? '▲' : '▼'}
          </button>
          {expandedSession === event.type && (
            <>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="no-data-message">Error: {error}</p>
              ) : driverResults.length > 0 ? (
                <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>No</th>
            <th>Driver</th>
            <th>Car</th>
            {isQualificationSession || isSprintQualificationSession ? (
              <>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
              </>
            ) : (isRaceSession || isSprintRace) ? (
              <>
                <th>Laps</th>
                <th>Gap</th>
                <th>Points</th>
              </>
            ) : (
              <>
                <th>Time</th>
                <th>Gap</th>
                <th>Laps</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {driverResults.map((result, idx) => (
            <tr key={idx}>
              <td data-label="Pos">{result.pos}</td>
              <td data-label="No">{result.no}</td>
              <td data-label="Driver">{result.driver}</td>
              <td data-label="Car">{result.car}</td>
              {isQualificationSession || isSprintQualificationSession ? (
                <>
                  <td data-label="Q1">{result.time}</td>
                  <td data-label="Q2">{result.gap}</td>
                  <td data-label="Q3">{result.laps}</td>
                </>
              ) : (isRaceSession || isSprintRace) ? (
                <>
                  <td data-label="Laps">{result.time}</td>
                  <td data-label="Gap">{result.gap}</td>
                  <td data-label="Points">{result.laps}</td>
                </>
              ) : (
                <>
                  <td data-label="Time">{result.time}</td>
                  <td data-label="Gap">{result.gap}</td>
                  <td data-label="Laps">{result.laps}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
              ) : (
                <p className="no-data-message">No data available for this session.</p>
              )}
            </>
          )}
        </div>
      ))}
      <button onClick={onGoBack} className="go-back-button">
        Go back
      </button>
    </div>
  );
};

export default GrandPrixDetails;