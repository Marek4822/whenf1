import React from 'react';
import PropTypes from 'prop-types';
import GrandPrixDetails from './GrandPrixDetails';

const GrandPrixButton = ({ isActive, setActive, grandsPrixData }) => {
  const [selectedGrandPrix, setSelectedGrandPrix] = React.useState(null);

  const toggleDetails = () => {
    setActive(prev => !prev);
    setSelectedGrandPrix(null);
  };

  if (!grandsPrixData) {
    return (
      <div className="mb-6">
        <button
          onClick={toggleDetails}
          className="mt-3 w-full bg-f1-blue hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
        >
          {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
        </button>
        {isActive && <p className="mt-2 text-f1-gray">Loading Grand Prix data...</p>}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={toggleDetails}
        className="mt-3 w-full bg-f1-blue hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
      >
        {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
      </button>

      {isActive && (
        <div className="mt-4 space-y-4">
          {!selectedGrandPrix ? (
            grandsPrixData.GrandsPrix?.length > 0 ? (
              grandsPrixData.GrandsPrix.map((gp) => (
                <div key={`${gp.name}-${gp.round}`} className="bg-f1-card rounded-xl shadow-f1-card p-4">
                  <h3 className="text-xl font-semibold text-f1-text mb-2">{gp.name}</h3>
                  <div className="space-y-2">
                    {gp.events?.map((event) => (
                      <div key={`${gp.name}-${event.type}`} className="flex justify-between text-sm">
                        <span className="font-medium text-f1-text">{event.type}</span>
                        <span className="text-f1-gray">
                          {event.date} at {event.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedGrandPrix(gp)}
                    className="mt-3 w-full bg-f1-blue hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    More Details →
                  </button>
                </div>
              ))
            ) : (
              <p className="text-f1-gray italic">No Grand Prix data available</p>
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
  grandsPrixData: PropTypes.object,
};

export default GrandPrixButton;