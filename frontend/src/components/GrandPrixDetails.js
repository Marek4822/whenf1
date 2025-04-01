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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{grandPrix.name}</h2>
      
      <div className="space-y-3 mb-6">
        {grandPrix.events.map((event, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => handleSessionClick(event.type)}
              disabled={loading}
              className={`w-full p-3 text-left font-medium transition-colors ${
                expandedSession === event.type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>
                  {event.type}: {event.date} at {event.time}
                </span>
                <span>{expandedSession === event.type ? '▲' : '▼'}</span>
              </div>
            </button>
            
            {expandedSession === event.type && (
              <div className="p-4 bg-white">
                {loading ? (
                  <p className="text-center py-4">Loading...</p>
                ) : error ? (
                  <p className="text-red-500 mb-2">Error: {error}</p>
                ) : driverResults.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-700 text-white">
                        <tr>
                          <th className="p-3 text-left">Pos</th>
                          <th className="p-3 text-left">No</th>
                          <th className="p-3 text-left">Driver</th>
                          <th className="p-3 text-left">Car</th>
                          {isQualificationSession || isSprintQualificationSession ? (
                            <>
                              <th className="p-3 text-left">Q1</th>
                              <th className="p-3 text-left">Q2</th>
                              <th className="p-3 text-left">Q3</th>
                            </>
                          ) : (isRaceSession || isSprintRace) ? (
                            <>
                              <th className="p-3 text-left">Laps</th>
                              <th className="p-3 text-left">Gap</th>
                              <th className="p-3 text-left">Points</th>
                            </>
                          ) : (
                            <>
                              <th className="p-3 text-left">Time</th>
                              <th className="p-3 text-left">Gap</th>
                              <th className="p-3 text-left">Laps</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {driverResults.map((result, idx) => (
                          <tr key={idx} className="hover:bg-gray-50">
                            <td className="p-3" data-label="Pos">{result.pos}</td>
                            <td className="p-3" data-label="No">{result.no}</td>
                            <td className="p-3" data-label="Driver">{result.driver}</td>
                            <td className="p-3" data-label="Car">{result.car}</td>
                            {isQualificationSession || isSprintQualificationSession ? (
                              <>
                                <td className="p-3" data-label="Q1">{result.time}</td>
                                <td className="p-3" data-label="Q2">{result.gap}</td>
                                <td className="p-3" data-label="Q3">{result.laps}</td>
                              </>
                            ) : (isRaceSession || isSprintRace) ? (
                              <>
                                <td className="p-3" data-label="Laps">{result.time}</td>
                                <td className="p-3" data-label="Gap">{result.gap}</td>
                                <td className="p-3" data-label="Points">{result.laps}</td>
                              </>
                            ) : (
                              <>
                                <td className="p-3" data-label="Time">{result.time}</td>
                                <td className="p-3" data-label="Gap">{result.gap}</td>
                                <td className="p-3" data-label="Laps">{result.laps}</td>
                              </>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No data available for this session.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button 
        onClick={onGoBack} 
        className="w-full bg-gray-600 text-white p-3 rounded-xl font-medium hover:bg-gray-700 transition-colors"
      >
        Go back
      </button>
    </div>
  );
};

export default GrandPrixDetails;