import React, { useState, useEffect } from 'react';

const TimeArea = ({testDetails}) => {
  const initialTimeInSeconds = testDetails.duration*60; // 5 minutes in seconds
  const [timeRemaining, setTimeRemaining] = useState(() => {
    // Retrieve the timeRemaining from local storage or use the initial value
    const storedTime = localStorage.getItem('timeRemaining');
    return storedTime ? parseInt(storedTime, 10) : initialTimeInSeconds;
  });

  useEffect(() => {
    let timer;

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          // Save the timeRemaining to local storage
          localStorage.setItem('timeRemaining', prevTime - 1);
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup the timer when the component unmounts or when time reaches zero
    return () => clearInterval(timer);

  }, [timeRemaining]);

  // Format the time in MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <h3>Time Area</h3>
      <p>Time Remaining: {formatTime(timeRemaining)}</p>
    </div>
  );
};

export default TimeArea;
