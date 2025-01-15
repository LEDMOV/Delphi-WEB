// src/components/pages/Flashcards.js
import React, { useState } from 'react';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to XML.' },
  ]);

  return (
    <div className="text-center">
      <h1 className="text-4xl mb-4">Flashcards</h1>
      <div className="grid gap-4">
        {flashcards.map(card => (
          <div key={card.id} className="p-4 bg-white shadow-lg rounded-lg">
            <h2 className="text-xl font-bold mb-2">{card.question}</h2>
            <p>{card.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
