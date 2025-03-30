import React, { useState } from 'react';
import { fetchWithTimeout, API_BASE_URL } from '../api/api';

const DriverStandings = ({ isActive, setActive }) => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleStandings = async () => {
    if (isActive) {
      setActive(); // Close if already active
    } else {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWithTimeout(`${API_BASE_URL}/api/driver_standings`);
        setStandings(data);
        setActive(); // Set as active
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
    <div className="grand-prix-button">
      <button onClick={toggleStandings} disabled={loading}>
        {loading ? 'Loading...' : isActive ? 'Hide Driver Standings' : 'Show Driver Standings'}
      </button>
    </div>
      
      {isActive && (
        <div className="content-container">
          {error && <p className="error">{error}</p>}
          {standings.length > 0 && (
            <div className="card">
              <table>
                <thead>
                  <tr>
                    <th>Pos</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {standings.map((standing, index) => (
                    <tr key={index}>
                      <td data-label="Pos">{standing.position}</td>
                      <td data-label="Driver">{standing.driver}</td>
                      <td data-label="Team">{standing.team}</td>
                      <td data-label="Points">{standing.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default DriverStandings;