import React, { useState } from 'react';
import './Flashcards.css';

const FlipCardTest = () => {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="flip-card" onClick={toggleFlip}>
      <div className={`flip-card-inner ${flipped ? 'flip' : ''}`}>
        <div className="flip-card-front p-8 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Front Side</h2>
        </div>
        <div className="flip-card-back p-8 flex items-center justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Back Side</h2>
        </div>
      </div>
    </div>
  );
};

export default FlipCardTest;
