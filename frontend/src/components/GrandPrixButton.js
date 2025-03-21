import React, { useState } from 'react';
import GrandPrixDetails from './GrandPrixDetails';
import F1_DATA from '../data/f1Data';

const GrandPrixButton = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedGrandPrix, setSelectedGrandPrix] = useState(null);

  console.log("F1_DATA:", F1_DATA); // Debugging

  const handleMoreDetailsClick = (grandPrix) => {
    setSelectedGrandPrix(grandPrix);
    setShowDetails(true); // Ensure details are shown
  };

  const handleGoBack = () => {
    setSelectedGrandPrix(null);
    setShowDetails(false); // Reset showDetails when going back
  };

  const handleHideAllDetails = () => {
    console.log("Toggling showDetails:", !showDetails); // Debugging
    setShowDetails(!showDetails);
    setSelectedGrandPrix(null); // Reset selected Grand Prix
  };

  return (
    <div className="grand-prix-button">
      <button onClick={handleHideAllDetails}>
        {showDetails ? 'Hide All Grand Prix Details' : 'Show All Grand Prix Details'}
      </button>

      {showDetails && !selectedGrandPrix && (
        <div className="details-container">
          {F1_DATA.GrandsPrix.length > 0 ? (
            F1_DATA.GrandsPrix.map((grandPrix, index) => (
              <div key={index} className="grand-prix-container">
                <h3>{grandPrix.name}</h3>
                {grandPrix.events.map((event, eventIndex) => (
                  <div key={eventIndex} className="event-container">
                    <p>
                      {event.type}: {event.date} at {event.time}
                    </p>
                  </div>
                ))}
                <button
                  onClick={() => handleMoreDetailsClick(grandPrix)}
                  className="more-details-button"
                >
                  MORE Details
                </button>
              </div>
            ))
          ) : (
            <p>No Grand Prix events found.</p>
          )}
        </div>
      )}

      {selectedGrandPrix && (
        <GrandPrixDetails grandPrix={selectedGrandPrix} onGoBack={handleGoBack} />
      )}
    </div>
  );
};

export default GrandPrixButton;