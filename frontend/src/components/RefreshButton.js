import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RefreshButton = ({ onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleRefresh = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('http://localhost:5000/api/refresh-data', {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setMessage('Data refreshed successfully!');
        onRefresh();
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <button 
        onClick={handleRefresh}
        disabled={isLoading}
        className="w-full bg-green-600 text-white p-3 rounded-xl font-medium hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Refreshing...' : 'Refresh Data'}
      </button>
      {message && (
        <div className={`mt-2 text-sm ${
          message.includes('Error') ? 'text-red-500' : 'text-green-600'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
};

RefreshButton.propTypes = {
  onRefresh: PropTypes.func
};

export default RefreshButton;