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
    <div className="refresh-button">
      <button 
        onClick={handleRefresh}
        disabled={isLoading}
      >
        {isLoading ? 'Refreshing...' : 'Refresh Data'}
      </button>
      {message && <div className="refresh-message">{message}</div>}
    </div>
  );
};

RefreshButton.propTypes = {
  onRefresh: PropTypes.func
};

export default RefreshButton;