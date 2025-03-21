import React, { useState } from 'react';
import { fetchDriverResults } from '../api';

const GrandPrixDetails = ({ grandPrix, onGoBack }) => {
  const [expandedSession, setExpandedSession] = useState(null);
  const [driverResults, setDriverResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSessionClick = async (sessionType) => {
    if (expandedSession === sessionType) {
      // Collapse if the same session is clicked again
      setExpandedSession(null);
    } else {
      // Expand the clicked session
      setExpandedSession(sessionType);
      setLoading(true);
      setError(null);

      try {
        const results = await fetchDriverResults(grandPrix.name, sessionType);
        setDriverResults(results);
      } catch (err) {
        setError(err.message); // Display error message
      } finally {
        setLoading(false);
      }
    }
  };

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
                      <th>Time</th>
                      <th>Gap</th>
                      <th>Laps</th>
                    </tr>
                  </thead>
                  <tbody>
                    {driverResults.map((result, idx) => (
                      <tr key={idx}>
                        <td>{result.pos}</td>
                        <td>{result.no}</td>
                        <td>{result.driver}</td>
                        <td>{result.car}</td>
                        <td>{result.time}</td>
                        <td>{result.gap}</td>
                        <td>{result.laps}</td>
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