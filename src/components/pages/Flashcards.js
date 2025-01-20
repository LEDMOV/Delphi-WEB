// src/components/pages/Flashcards.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import './Flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Function to fetch flashcards
  const fetchFlashcards = async () => {
    setLoading(true);
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      const q = query(collection(db, 'flashcards'), where('uid', '==', user.uid), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const flashcardsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setFlashcards(flashcardsData);
    } catch (error) {
      setError('Failed to fetch flashcards: ' + error.message);
    }
    setLoading(false);
  };

  // UseEffect hook to fetch flashcards when user logs in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchFlashcards();
      } else {
        setFlashcards([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      await addDoc(collection(db, 'flashcards'), {
        uid: user.uid,
        question,
        answer,
        createdAt: new Date().toISOString()
      });

      setQuestion('');
      setAnswer('');
      fetchFlashcards();
    } catch (error) {
      console.error("Error saving flashcard:", error); // Debugging line
      setError('Failed to save flashcard: ' + error.message);
    }
  };

  // Function to handle flashcard flip
  const handleFlip = (index) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index].flipped = !newFlashcards[index].flipped;
    setFlashcards(newFlashcards);
  };

  return (
    <div className="flashcards-container">
      <h1>Flashcards</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="flashcards-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Question"
          required
        />
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Answer"
          required
        />
        <button type="submit" className="flashcards-button">Add Flashcard</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flashcards-list">
          {flashcards.map((flashcard, index) => (
            <div key={flashcard.id} className={`flashcard ${flashcard.flipped ? 'flipped' : ''}`} onClick={() => handleFlip(index)}>
              {flashcard.flipped ? (
                <p><strong>Answer:</strong> {flashcard.answer}</p>
              ) : (
                <p><strong>Question:</strong> {flashcard.question}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flashcards;
