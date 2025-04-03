import React from 'react';
import PropTypes from 'prop-types';
import GrandPrixDetails from './GrandPrixDetails';

const GrandPrixButton = ({ isActive, setActive, grandsPrixData }) => {
  const [selectedGrandPrix, setSelectedGrandPrix] = React.useState(null);

  const toggleDetails = () => {
    setActive(prev => !prev);
    setSelectedGrandPrix(null);
  };

  // Function to check if Grand Prix is over
  const isGrandPrixOver = (gp) => {
    if (!gp.events || gp.events.length === 0) return false;
    
    // Find the race event (Grand Prix)
    const raceEvent = gp.events.find(event => event.type === 'Grand Prix');
    if (!raceEvent) return false;
    
    const raceDate = new Date(raceEvent.datetime);
    const now = new Date();
    return now > raceDate;
  };

  if (!grandsPrixData) {
    return (
      <div className="mb-6">
        <button
          onClick={toggleDetails}
          className="w-full bg-f1-blue hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-colors shadow-md"
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
              grandsPrixData.GrandsPrix.map((gp) => {
                const gpOver = isGrandPrixOver(gp);
                return (
                  <div 
                    key={`${gp.name}-${gp.round}`} 
                    className={`rounded-xl shadow-md p-4 transition-all `}
                  >
                    <h3 className={`text-xl font-semibold mb-2 ${gpOver ? 'text-f1-gray' : 'text-f1-text'}`}>
                      {gp.name}
                      {gpOver && <span className="ml-2 text-sm">(Completed)</span>}
                    </h3>
                    {!gpOver && (
                      <div className="space-y-2">
                        {gp.events?.map((event) => (
                          <div key={`${gp.name}-${event.type}`} className="flex justify-between text-sm">
                            <span className={`font-medium ${gpOver ? 'text-f1-gray' : 'text-f1-text'}`}>{event.type}</span>
                            <span className={gpOver ? 'text-f1-gray' : 'text-f1-gray'}>
                              {event.date} at {event.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => setSelectedGrandPrix(gp)}
                      className={`mt-3 w-full py-2 px-4 rounded-lg transition-colors ${
                        gpOver 
                          ? 'bg-gray-600 hover:bg-gray-700 text-f1-text' 
                          : 'bg-f1-blue hover:bg-blue-600 text-white'
                      }`}
                    >
                      More Details →
                    </button>
                  </div>
                );
              })
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