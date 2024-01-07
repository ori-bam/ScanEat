import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleScroll = () => {
    const scrollThreshold = 100; // Adjust this value as needed
    setIsDisplayed(window.scrollY > scrollThreshold);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className={`fixed bottom-5 right-5 bg-blue-500 bg-opacity-70 text-white rounded-full p-2 shadow hover:bg-opacity-80 focus:outline-none ${
        isDisplayed ? 'visible' : 'invisible'
      }`}
      onClick={scrollToTop}
    >
      up
    </button>
  );
};

export default ScrollToTopButton;
