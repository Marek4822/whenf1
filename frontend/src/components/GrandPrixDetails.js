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

  const renderMobileResultCard = (result, idx) => {
    return (
      <div key={idx} className="border rounded-lg p-3 mb-2 bg-white shadow-sm">
        <div className="flex justify-between border-b pb-2 mb-2">
          <span className="font-medium">#{result.pos}</span>
          <span className="font-medium">{result.driver}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Number:</span> {result.no}
          </div>
          <div>
            <span className="text-gray-500">Team:</span> {result.car}
          </div>
          
          {isQualificationSession || isSprintQualificationSession ? (
            <>
              <div>
                <span className="text-gray-500">Q1:</span> {result.time || '-'}
              </div>
              <div>
                <span className="text-gray-500">Q2:</span> {result.gap || '-'}
              </div>
              <div>
                <span className="text-gray-500">Q3:</span> {result.laps || '-'}
              </div>
            </>
          ) : (isRaceSession || isSprintRace) ? (
            <>
              <div>
                <span className="text-gray-500">Laps:</span> {result.time || '-'}
              </div>
              <div>
                <span className="text-gray-500">Gap:</span> {result.gap || '-'}
              </div>
              <div>
                <span className="text-gray-500">Points:</span> {result.laps || '-'}
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-gray-500">Time:</span> {result.time || '-'}
              </div>
              <div>
                <span className="text-gray-500">Gap:</span> {result.gap || '-'}
              </div>
              <div>
                <span className="text-gray-500">Laps:</span> {result.laps || '-'}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="p-2 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-3">{grandPrix.name}</h2>
      
      <div className="space-y-2 mb-4">
        {grandPrix.events.map((event, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <button
              onClick={() => handleSessionClick(event.type)}
              disabled={loading}
              className={`w-full p-3 text-left font-medium text-sm transition-colors ${
                expandedSession === event.type 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate">
                  {event.type}: {event.date} at {event.time}
                </span>
                <span className="ml-2">{expandedSession === event.type ? '▲' : '▼'}</span>
              </div>
            </button>
            
            {expandedSession === event.type && (
              <div className="p-2 bg-white">
                {loading ? (
                  <p className="text-center py-3 text-sm">Loading...</p>
                ) : error ? (
                  <p className="text-red-500 text-sm mb-2">Error: {error}</p>
                ) : driverResults.length > 0 ? (
                  <>
                    {/* Desktop Table (hidden on mobile) */}
                    <div className="hidden md:block">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-700 text-white">
                          <tr>
                            <th className="p-2 text-left">Pos</th>
                            <th className="p-2 text-left">No</th>
                            <th className="p-2 text-left">Driver</th>
                            <th className="p-2 text-left">Car</th>
                            {isQualificationSession || isSprintQualificationSession ? (
                              <>
                                <th className="p-2 text-left">Q1</th>
                                <th className="p-2 text-left">Q2</th>
                                <th className="p-2 text-left">Q3</th>
                              </>
                            ) : (isRaceSession || isSprintRace) ? (
                              <>
                                <th className="p-2 text-left">Laps</th>
                                <th className="p-2 text-left">Gap</th>
                                <th className="p-2 text-left">Points</th>
                              </>
                            ) : (
                              <>
                                <th className="p-2 text-left">Time</th>
                                <th className="p-2 text-left">Gap</th>
                                <th className="p-2 text-left">Laps</th>
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {driverResults.map((result, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="p-2" data-label="Pos">{result.pos}</td>
                              <td className="p-2" data-label="No">{result.no}</td>
                              <td className="p-2" data-label="Driver">{result.driver}</td>
                              <td className="p-2" data-label="Car">{result.car}</td>
                              {isQualificationSession || isSprintQualificationSession ? (
                                <>
                                  <td className="p-2" data-label="Q1">{result.time}</td>
                                  <td className="p-2" data-label="Q2">{result.gap}</td>
                                  <td className="p-2" data-label="Q3">{result.laps}</td>
                                </>
                              ) : (isRaceSession || isSprintRace) ? (
                                <>
                                  <td className="p-2" data-label="Laps">{result.time}</td>
                                  <td className="p-2" data-label="Gap">{result.gap}</td>
                                  <td className="p-2" data-label="Points">{result.laps}</td>
                                </>
                              ) : (
                                <>
                                  <td className="p-2" data-label="Time">{result.time}</td>
                                  <td className="p-2" data-label="Gap">{result.gap}</td>
                                  <td className="p-2" data-label="Laps">{result.laps}</td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    {/* Mobile Cards (shown on mobile) */}
                    <div className="md:hidden space-y-2">
                      {driverResults.map((result, idx) => renderMobileResultCard(result, idx))}
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm text-center py-3">No data available for this session.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button 
        onClick={onGoBack} 
        className="w-full bg-gray-600 text-white p-3 rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
      >
        Go back
      </button>
    </div>
  );
};

export default GrandPrixDetails;