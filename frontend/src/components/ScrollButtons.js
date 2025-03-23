import React, { useState, useEffect } from 'react';
import '../styles.css';

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
    <div className={`scroll-buttons ${showButtons ? 'visible' : ''}`}>
      <button onClick={scrollToTop} className="scroll-button top-button">
        ↑
      </button>
      <button onClick={scrollToBottom} className="scroll-button bottom-button">
        ↓
      </button>
    </div>
  );
};

export default ScrollButtons;