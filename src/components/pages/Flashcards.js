import React, { useState } from 'react';
import './Flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    { id: 1, question: 'What is React?', answer: 'A JavaScript library for building user interfaces.' },
    { id: 2, question: 'What is JSX?', answer: 'A syntax extension for JavaScript that looks similar to XML.' },
  ]);
  const [fullscreenCard, setFullscreenCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  const toggleFullscreen = (card) => {
    setFullscreenCard(card);
    setFlipped(false);
  };

  const toggleFlip = (e) => {
    e.stopPropagation();
    setFlipped(!flipped);
  };

  const handleOverlayClick = () => {
    setFullscreenCard(null);
    setFlipped(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.question && newCard.answer) {
      setFlashcards([...flashcards, { ...newCard, id: flashcards.length + 1 }]);
      setNewCard({ question: '', answer: '' });
    }
  };

  return (
    <div className="text-center font-custom p-8">
      <h1 className="text-4xl mb-4 text-gray-800">Flashcards</h1>
      <form onSubmit={handleAddCard} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            name="question"
            value={newCard.question}
            onChange={handleInputChange}
            placeholder="Question"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="answer"
            value={newCard.answer}
            onChange={handleInputChange}
            placeholder="Answer"
            className="w-full p-2 border border-gray-300 rounded mb-2"
            required
          />
        </div>
        <button
          type="submit"
          className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
        >
          Add Flashcard
        </button>
      </form>
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
          onClick={handleOverlayClick}
        >
          <div
            className={`flip-card relative bg-white shadow-lg rounded-lg max-w-3xl w-full h-3/4 transform transition duration-300 ${
              flipped ? 'flip' : ''
            }`}
            onClick={toggleFlip}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front p-8 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">{fullscreenCard.question}</h2>
              </div>
              <div className="flip-card-back p-8 flex items-center justify-center">
                <h2 className="text-2xl font-bold text-gray-800">{fullscreenCard.answer}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
