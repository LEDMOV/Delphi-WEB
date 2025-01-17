import React, { useState, useEffect } from 'react';
import { db, auth } from './delphi-web/src/firebase.js'; // Correct relative path
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import './Flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [fullscreenCard, setFullscreenCard] = useState(null);
  const [flipped, setFlipped] = useState(false);
  const [newCard, setNewCard] = useState({ question: '', answer: '' });

  useEffect(() => {
    if (auth.currentUser) {
      const fetchFlashcards = async () => {
        const q = query(
          collection(db, 'flashcards'),
          where('userId', '==', auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const userFlashcards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFlashcards(userFlashcards);
      };
      fetchFlashcards();
    }
  }, [auth.currentUser]);

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

  const handleAddCard = async (e) => {
    e.preventDefault();
    if (newCard.question && newCard.answer) {
      const newFlashcard = {
        ...newCard,
        userId: auth.currentUser.uid
      };
      const docRef = await addDoc(collection(db, 'flashcards'), newFlashcard);
      setFlashcards([...flashcards, { id: docRef.id, ...newFlashcard }]);
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
          </div>
        ))}
      </div>
      {fullscreenCard && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 p-8"
          onClick={handleOverlayClick}
        >
          <div
            className="flip-card relative bg-white shadow-lg rounded-lg max-w-3xl w-full h-3/4 transform transition duration-300"
            onClick={toggleFlip}
          >
            <div className={`flip-card-inner ${flipped ? 'flip' : ''}`}>
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
