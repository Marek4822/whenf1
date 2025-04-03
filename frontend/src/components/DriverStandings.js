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

  const renderMobileDriverCard = (standing, index) => (
    <div key={index} className="border border-gray-800 rounded-lg p-3 mb-2 bg-f1-card shadow-sm">
      <div className="flex justify-between border-b border-gray-800 pb-2 mb-2">
        <span className="font-medium text-f1-text">#{standing.position}</span>
        <span className="font-medium text-f1-text">{standing.driver}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-f1-text">
          <span className="text-f1-gray">Team:</span> {standing.team}
        </div>
        <div className="text-f1-text">
          <span className="text-f1-gray">Points:</span> {standing.points}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-4">
      <button 
        onClick={toggleStandings} 
        disabled={loading} 
        className="mt-3 w-full bg-f1-blue hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
      >
        {loading ? 'Loading...' : isActive ? 'Hide Driver Standings' : 'Show Driver Standings'}
      </button>
      
      {isActive && (
        <div className="mt-3">
          {error && <p className="text-red-400 mb-2 text-sm">{error}</p>}
          {standings.length > 0 && (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-f1-card rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-f1-dark text-f1-text">
                    <tr>
                      <th className="p-2 text-left">Pos</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Team</th>
                      <th className="p-2 text-left">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {standings.map((standing, index) => (
                      <tr key={index} className="hover:bg-gray-800">
                        <td className="p-2 text-f1-text">{standing.position}</td>
                        <td className="p-2 text-f1-text">{standing.driver}</td>
                        <td className="p-2 text-f1-text">{standing.team}</td>
                        <td className="p-2 text-f1-text">{standing.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Mobile Cards */}
              <div className="md:hidden space-y-2 mt-2">
                {standings.map((standing, index) => renderMobileDriverCard(standing, index))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverStandings;