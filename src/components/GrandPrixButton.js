import React, { useState, useEffect } from 'react';
import GrandPrixDetails from './GrandPrixDetails';
import { fetchSessions, fetchSessionsByGrandPrix } from './api';

const GrandPrixButton = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedGrandPrix, setSelectedGrandPrix] = useState(null);
  const [grandPrixList, setGrandPrixList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all sessions on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const sessions = await fetchSessions();
        // Extract unique Grand Prix names
        const uniqueGrandPrix = [...new Set(sessions.map((session) => session.grand_prix_name))];
        setGrandPrixList(uniqueGrandPrix);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleMoreDetailsClick = (grandPrixName) => {
    setSelectedGrandPrix(grandPrixName);
  };

  const handleGoBack = () => {
    setSelectedGrandPrix(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="grand-prix-button">
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide All Grand Prix Details' : 'Show All Grand Prix Details'}
      </button>

      {showDetails && !selectedGrandPrix && (
        <div className="details-container">
          {grandPrixList.length > 0 ? (
            grandPrixList.map((grandPrix, index) => (
              <div key={index} className="grand-prix-container">
                <h3>{grandPrix}</h3>
                <button
                  onClick={() => handleMoreDetailsClick(grandPrix)}
                  className="more-details-button"
                >
                  MORE Details
                </button>
              </div>
            ))
          ) : (
            <p>No upcoming Grand Prix events found.</p>
          )}
        </div>
      )}

      {selectedGrandPrix && (
        <GrandPrixDetails grandPrixName={selectedGrandPrix} onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default GrandPrixButton;