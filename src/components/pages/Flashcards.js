import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './Flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null); // Track selected flashcard

  // Fetch flashcards
  useEffect(() => {
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

    fetchFlashcards();
  }, []);

  // Add a new flashcard
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
      fetchFlashcards(); // Refresh the flashcards list
    } catch (error) {
      setError('Failed to save flashcard: ' + error.message);
    }
  };

  // Edit a flashcard
  const handleEditFlashcard = async (id, updatedQuestion, updatedAnswer) => {
    try {
      const flashcardRef = doc(db, 'flashcards', id);
      await updateDoc(flashcardRef, {
        question: updatedQuestion,
        answer: updatedAnswer
      });

      setSelectedFlashcard(null); // Close the edit modal
      fetchFlashcards(); // Refresh the flashcards list
    } catch (error) {
      setError('Failed to update flashcard: ' + error.message);
    }
  };

  // Delete a flashcard
  const handleDeleteFlashcard = async (id) => {
    try {
      await deleteDoc(doc(db, 'flashcards', id));
      fetchFlashcards(); // Refresh the flashcards list
    } catch (error) {
      setError('Failed to delete flashcard: ' + error.message);
    }
  };

  // Handle flashcard click
  const handleFlashcardClick = (flashcard) => {
    if (selectedFlashcard && selectedFlashcard.id === flashcard.id) {
      setSelectedFlashcard(null); // Deselect if the same flashcard is clicked again
    } else {
      setSelectedFlashcard(flashcard); // Select the clicked flashcard
    }
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
          {flashcards.map((flashcard) => (
            <div
              key={flashcard.id}
              className={`flashcard ${selectedFlashcard?.id === flashcard.id ? 'selected' : ''}`}
              onClick={() => handleFlashcardClick(flashcard)}
            >
              <p><strong>Question:</strong> {flashcard.question}</p>
              <p><strong>Answer:</strong> {flashcard.answer}</p>
              {selectedFlashcard?.id === flashcard.id && (
                <div className="flashcard-actions">
                  <button onClick={() => handleEditFlashcard(flashcard.id, flashcard.question, flashcard.answer)}>Edit</button>
                  <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flashcards;