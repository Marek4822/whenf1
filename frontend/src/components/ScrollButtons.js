import React, { useState, useEffect } from 'react';

const ScrollButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Function to scroll to the bottom of the page
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  // Function to handle scroll events
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButtons(true);

      // Clear the previous timeout (if any)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Set a new timeout to hide the buttons after 2 seconds of inactivity
      const timeout = setTimeout(() => {
        setShowButtons(false);
      }, 3000);

      setScrollTimeout(timeout);
    } else {
      setShowButtons(false);
    }
  };

  // Effect to add/remove the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout]);

  return (
    <div className={`fixed bottom-5 right-5 flex flex-col gap-2 transition-opacity ${
      showButtons ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <button 
        onClick={scrollToTop}
        className="w-10 h-10 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
      >
        ↑
      </button>
      <button 
        onClick={scrollToBottom}
        className="w-10 h-10 bg-blue-600 text-white rounded shadow-lg hover:bg-blue-700 flex items-center justify-center transition-colors"
      >
        ↓
      </button>
    </div>
  );
};

export default ScrollButtons;