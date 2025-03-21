import React, { useState } from 'react';
import DRIVER_SESSION_DATA from '../data/driverSessionData';

const GrandPrixDetails = ({ grandPrixName, onGoBack }) => {
  const [expandedSession, setExpandedSession] = useState(null);

  const handleSessionClick = (sessionType) => {
    if (expandedSession === sessionType) {
      // Collapse if the same session is clicked again
      setExpandedSession(null);
    } else {
      // Expand the clicked session
      setExpandedSession(sessionType);
    }
  };

  const sessions = DRIVER_SESSION_DATA[grandPrixName];

  return (
    <div className="grand-prix-details">
      <h2>{grandPrixName}</h2>
      {sessions ? (
        Object.entries(sessions).map(([sessionType, sessionData]) => (
          <div key={sessionType} className="session-container">
            <button
              onClick={() => handleSessionClick(sessionType)}
              className="session-button"
            >
              {sessionType} {expandedSession === sessionType ? '▲' : '▼'}
            </button>
            {expandedSession === sessionType && (
              <>
                {sessionData ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Position</th>
                        <th>Driver</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessionData.map((data, index) => (
                        <tr key={index}>
                          <td>{data.position}</td>
                          <td>{data.driver}</td>
                          <td>{data.time}</td>
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
        ))
      ) : (
        <p className="no-data-message">No session data available for this Grand Prix.</p>
      )}
      <button onClick={onGoBack} className="go-back-button">
        Go back
      </button>
    </div>
  );
};

export default GrandPrixDetails;