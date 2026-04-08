import React, { useEffect, useState } from 'react';

const Welcome = ({ onStart }) => {
  const [progress, setProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setShowWelcome(false), 300);
            setTimeout(onStart, 600);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }, 500);

    return () => clearTimeout(timer);
  }, [onStart]);

  if (!showWelcome) return null;

  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <h1>Добро пожаловать</h1>
        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{progress}%</p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;