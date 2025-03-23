import React, { useState } from 'react';
import GrandPrixDetails from './GrandPrixDetails';
import F1_DATA from '../data/f1Data';

const GrandPrixButton = ({ isActive, setActive }) => {
  const [selectedGrandPrix, setSelectedGrandPrix] = useState(null);

  const handleMoreDetailsClick = (grandPrix) => {
    setSelectedGrandPrix(grandPrix);
  };

  const handleGoBack = () => {
    setSelectedGrandPrix(null);
  };

  const handleHideAllDetails = () => {
    setActive(); // Use the prop to toggle visibility
    setSelectedGrandPrix(null);
  };

  return (
    <div className="grand-prix-button">
      <button onClick={handleHideAllDetails}>
        {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
      </button>

      {isActive && (
        <div className="details-container">
          {!selectedGrandPrix ? (
            F1_DATA.GrandsPrix.length > 0 ? (
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
            )
          ) : (
            <GrandPrixDetails grandPrix={selectedGrandPrix} onGoBack={handleGoBack} />
          )}
        </div>
      )}
    </div>
  );
};

export default GrandPrixButton;