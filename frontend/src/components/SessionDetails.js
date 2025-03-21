import React from 'react';
import DRIVER_SESSION_DATA from '../data/driverSessionData';

const GrandPrixDetails = ({ grandPrixName, onGoBack }) => {
  const sessions = DRIVER_SESSION_DATA[grandPrixName];

  return (
    <div className="grand-prix-details">
      <h2>{grandPrixName}</h2>
      {Object.entries(sessions).map(([sessionType, sessionData]) => (
        <div key={sessionType} className="session-container">
          <h3>{sessionType}</h3>
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
        </div>
      ))}
      <button onClick={onGoBack} className="go-back-button">
        Go back
      </button>
    </div>
  );
};

export default GrandPrixDetails;