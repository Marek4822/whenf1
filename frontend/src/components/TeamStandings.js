import React, { useState } from 'react';
import { fetchWithTimeout, API_BASE_URL } from '../api/api';

const TeamStandings = ({ isActive, setActive }) => {
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
          const data = await fetchWithTimeout(`${API_BASE_URL}/api/team_standings`);
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
        <button 
          onClick={toggleStandings} 
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          {loading ? 'Loading...' : isActive ? 'Hide Team Standings' : 'Show Team Standings'}
        </button>
        
        {isActive && (
          <div className="mt-4">
            {error && <p className="text-red-500 mb-2">{error}</p>}
            {standings.length > 0 && (
              <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="p-3 text-left">Pos</th>
                      <th className="p-3 text-left">Team</th>
                      <th className="p-3 text-left">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map((standing, index) => (
                      <tr key={index}>
                        <td data-label="Pos">{standing.position}</td>
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

export default TeamStandings;