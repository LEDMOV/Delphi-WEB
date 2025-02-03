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
  const [fullscreenFlashcard, setFullscreenFlashcard] = useState(null); // Track fullscreen flashcard
  const [isFlipped, setIsFlipped] = useState(false); // Track flip state
  const [isEditing, setIsEditing] = useState(false); // Track editing mode
  const [editQuestion, setEditQuestion] = useState(''); // Track edited question
  const [editAnswer, setEditAnswer] = useState(''); // Track edited answer

  // Fetch flashcards function
  const fetchFlashcards = async (user) => {
    setLoading(true);
    try {
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

  // Fetch flashcards on component mount and auth state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchFlashcards(user); // Fetch flashcards if the user is authenticated
      } else {
        setFlashcards([]); // Clear flashcards if the user is not authenticated
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
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
      fetchFlashcards(user); // Refresh the flashcards list
    } catch (error) {
      setError('Failed to save flashcard: ' + error.message);
    }
  };

  // Enter editing mode
  const handleEditClick = (flashcard) => {
    setEditQuestion(flashcard.question);
    setEditAnswer(flashcard.answer);
    setIsEditing(true);
  };

  // Save edited flashcard
  const handleSaveEdit = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      const flashcardRef = doc(db, 'flashcards', fullscreenFlashcard.id);
      await updateDoc(flashcardRef, {
        question: editQuestion,
        answer: editAnswer
      });

      setIsEditing(false); // Exit editing mode
      fetchFlashcards(user); // Refresh the flashcards list
    } catch (error) {
      setError('Failed to update flashcard: ' + error.message);
    }
  };

  // Delete a flashcard
  const handleDeleteFlashcard = async (id) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated.");
      }

      await deleteDoc(doc(db, 'flashcards', id));
      setFullscreenFlashcard(null); // Exit fullscreen mode
      fetchFlashcards(user); // Refresh the flashcards list
    } catch (error) {
      setError('Failed to delete flashcard: ' + error.message);
    }
  };

  // Handle flashcard click (enter fullscreen)
  const handleFlashcardClick = (flashcard) => {
    setFullscreenFlashcard(flashcard);
    setIsFlipped(false); // Reset flip state when entering fullscreen
    setIsEditing(false); // Reset editing mode
  };

  // Handle click outside the flashcard (exit fullscreen)
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('fullscreen-overlay')) {
      setFullscreenFlashcard(null);
    }
  };

  // Handle flip in fullscreen mode
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
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
              className="flashcard"
              onClick={() => handleFlashcardClick(flashcard)}
            >
              <p><strong>Question:</strong> {flashcard.question}</p>
              <p><strong>Answer:</strong> {flashcard.answer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Flashcard */}
      {fullscreenFlashcard && (
        <div className="fullscreen-overlay" onClick={handleClickOutside}>
          <div className="fullscreen-flashcard">
            {isEditing ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  placeholder="Question"
                  required
                />
                <input
                  type="text"
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  placeholder="Answer"
                  required
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
              </div>
            ) : (
              <div className={`flashcard-content ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
                <div className="flashcard-front">
                  <p><strong>Question:</strong> {fullscreenFlashcard.question}</p>
                </div>
                <div className="flashcard-back">
                  <p><strong>Answer:</strong> {fullscreenFlashcard.answer}</p>
                </div>
              </div>
            )}
            <div className="flashcard-actions">
              <button onClick={() => handleEditClick(fullscreenFlashcard)}>Edit</button>
              <button onClick={() => handleDeleteFlashcard(fullscreenFlashcard.id)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Flashcards;