import React, { useEffect } from 'react';
import { Button } from './Button';
import Logo from './Logo';


export const AssessmentHeader = ({ timeLeft, onTimeUp, isTimerRunning}) => {
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      if (timeLeft <= 1) {
        clearInterval(timer);
        onTimeUp();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isTimerRunning, onTimeUp]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-4 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Logo/>
        <h1 className="text-xl font-bold">Quiz Assessment</h1>
        <div className="flex items-center space-x-4">
          <div className="text-sm bg-red-600 font-bold py-3 px-2 rounded-lg text-white">Time Left: {formatTime(timeLeft)}</div>

        </div>
      </div>
    </header>
  );
};