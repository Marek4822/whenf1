import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GrandPrixDetails from './GrandPrixDetails';

const GrandPrixButton = ({ isActive, setActive, grandsPrixData }) => {
  const [selectedGrandPrix, setSelectedGrandPrix] = useState(null);

  // Handle component visibility and state cleanup
  const toggleDetails = () => {
    setActive(prev => !prev);
    setSelectedGrandPrix(null);
  };

  // Show loading state if data isn't ready
  if (!grandsPrixData) {
    return (
      <div className="grand-prix-button">
        <button onClick={toggleDetails} className="toggle-button">
          {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
        </button>
        {isActive && <div className="loading">Loading Grand Prix data...</div>}
      </div>
    );
  }

  return (
    <div className="grand-prix-button">
      <button onClick={toggleDetails} className="toggle-button">
        {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
      </button>

      {isActive && (
        <div className="gp-container">
          {!selectedGrandPrix ? (
            grandsPrixData.GrandsPrix?.length > 0 ? (
              grandsPrixData.GrandsPrix.map((gp) => (
                <div key={`${gp.name}-${gp.round}`} className="gp-card">
                  <h3>{gp.name}</h3>
                  <div className="events-list">
                    {gp.events?.map((event) => (
                      <div key={`${gp.name}-${event.type}`} className="event-item">
                        <span className="event-type">{event.type}</span>
                        <span className="event-time">
                          {event.date} at {event.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedGrandPrix(gp)}
                    className="details-button"
                  >
                    More Details →
                  </button>
                </div>
              ))
            ) : (
              <p className="no-data">No Grand Prix data available</p>
            )
          ) : (
            <GrandPrixDetails
              grandPrix={selectedGrandPrix}
              onGoBack={() => setSelectedGrandPrix(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

GrandPrixButton.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  grandsPrixData: PropTypes.shape({
    GrandsPrix: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        events: PropTypes.arrayOf(
          PropTypes.shape({
            type: PropTypes.string.isRequired,
            date: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            datetime: PropTypes.string.isRequired,
          })
        ).isRequired,
      })
    ).isRequired,
  }),
};

export default GrandPrixButton;