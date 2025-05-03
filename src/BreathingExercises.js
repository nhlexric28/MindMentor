import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const BreathingExercises = () => {
  const [step, setStep] = useState(0);
  const steps = ['Breathe In', 'Hold', 'Breathe Out', 'Breathe In'];
  const durations = useMemo(() => [4000, 4000, 4000, 4000], []); // Durations in milliseconds, memoized

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prevStep) => (prevStep + 1) % steps.length);
    }, durations[step]);

    return () => clearInterval(interval);
  }, [step, durations, steps.length]);

  return (
    <div id="breath" className="breathing-exercises">
      <h2>Guided Breathing Exercise</h2>
      <div className={`circle ${steps[step].toLowerCase().replace(' ', '-')}`}>
        <span>{steps[step]}</span>
      </div>
    </div>
  );
};

export default BreathingExercises;
