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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-md"
        >
          {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
        </button>
        {isActive && <p className="mt-2 text-gray-600">Loading Grand Prix data...</p>}
      </div>
    );
  }

  return (
    <div className="mb-6">
      <button
        onClick={toggleDetails}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-md"
      >
        {isActive ? 'Hide Grand Prix Details' : 'Show Grand Prix Details'}
      </button>

      {isActive && (
        <div className="mt-4 space-y-4">
          {!selectedGrandPrix ? (
            grandsPrixData.GrandsPrix?.length > 0 ? (
              grandsPrixData.GrandsPrix.map((gp) => (
                <div key={`${gp.name}-${gp.round}`} className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{gp.name}</h3>
                  <div className="space-y-2">
                    {gp.events?.map((event) => (
                      <div key={`${gp.name}-${event.type}`} className="flex justify-between text-sm">
                        <span className="font-medium text-gray-700">{event.type}</span>
                        <span className="text-gray-500">
                          {event.date} at {event.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedGrandPrix(gp)}
                    className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    More Details →
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No Grand Prix data available</p>
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