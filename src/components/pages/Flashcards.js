// src/components/pages/Flashcards.js
import React, { useState } from 'react';
import './Flashcards.css'; // Create a separate CSS file for custom styles

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to XML.' },
  ]);
  const [fullscreenCard, setFullscreenCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const toggleFullscreen = (card) => {
    setFullscreenCard(fullscreenCard ? null : card);
    setFlipped(false);
  };

  const toggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div className="text-center font-custom p-8">
      <h1 className="text-4xl mb-4 text-gray-800">Flashcards</h1>
      <div className={`grid gap-4 ${fullscreenCard ? 'hidden' : ''}`}>
        {flashcards.map(card => (
          <div
            key={card.id}
            className="p-4 bg-white shadow-lg rounded-lg transform transition duration-300 hover:scale-105 cursor-pointer"
            onClick={() => toggleFullscreen(card)}
          >
            <h2 className="text-xl font-bold mb-2 text-gray-800">{card.question}</h2>
            <p className="text-gray-600">{card.answer}</p>
          </div>
        ))}
      </div>
      {fullscreenCard && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-8"
          onClick={() => toggleFullscreen(null)}
        >
          <div
            className={`relative bg-white shadow-lg rounded-lg max-w-3xl w-full h-3/4 transform transition duration-300 ${
              flipped ? 'flip' : ''
            }`}
            onClick={toggleFlip}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{fullscreenCard.question}</h2>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => toggleFullscreen(null)}
                >
                  Close
                </button>
              </div>
              <div className="flip-card-back p-8">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{fullscreenCard.answer}</h2>
                <button
                  className="mt-4 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => toggleFullscreen(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
