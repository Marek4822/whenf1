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
    <div key={index} className="border rounded-lg p-3 mb-2 bg-white shadow-sm">
      <div className="flex justify-between border-b pb-2 mb-2">
        <span className="font-medium">#{standing.position}</span>
        <span className="font-medium">{standing.driver}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Team:</span> {standing.team}
        </div>
        <div>
          <span className="text-gray-500">Points:</span> {standing.points}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-4">
      <button 
        onClick={toggleStandings} 
        disabled={loading} 
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
      >
        {loading ? 'Loading...' : isActive ? 'Hide Driver Standings' : 'Show Driver Standings'}
      </button>
      
      {isActive && (
        <div className="mt-3">
          {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
          {standings.length > 0 && (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="p-2 text-left">Pos</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Team</th>
                      <th className="p-2 text-left">Points</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {standings.map((standing, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="p-2">{standing.position}</td>
                        <td className="p-2">{standing.driver}</td>
                        <td className="p-2">{standing.team}</td>
                        <td className="p-2">{standing.points}</td>
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