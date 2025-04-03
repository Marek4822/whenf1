import React, { useState, useEffect, useCallback, useRef } from 'react';

const ScrollButtons = () => {
  const [showButtons, setShowButtons] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const handleScroll = useCallback(() => {
    if (window.scrollY > 100) {
      setShowButtons(true);

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 3000);
    } else {
      setShowButtons(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <div className={`fixed bottom-5 right-5 flex flex-col gap-2 transition-opacity duration-300 ${
      showButtons ? 'opacity-100 visible' : 'opacity-0 invisible'
    }`}>
      <button 
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-10 h-10 bg-f1-blue text-white rounded shadow-lg hover:bg-blue-700 flex items-center justify-center transition-colors duration-200"
      >
        ↑
      </button>
      <button 
        onClick={scrollToBottom}
        aria-label="Scroll to bottom"
        className="w-10 h-10 bg-f1-blue text-white rounded shadow-lg hover:bg-blue-700 flex items-center justify-center transition-colors duration-200"
      >
        ↓
      </button>
    </div>
  );
};

export default ScrollButtons;