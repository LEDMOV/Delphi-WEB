import React, { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../firebase';
import { collection, addDoc, getDocs, query, where, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedFlashcard, setSelectedFlashcard] = useState(null); // Track selected flashcard for editing
  const [editQuestion, setEditQuestion] = useState(''); // State for editing question
  const [editAnswer, setEditAnswer] = useState(''); // State for editing answer

  // Function to fetch flashcards
  const fetchFlashcards = useCallback(async () => {
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
        ...doc.data(),
        flipped: false // Initialize flipped state
      }));

      setFlashcards(flashcardsData);
    } catch (error) {
      console.error('Error fetching flashcards:', error);
      setError('Failed to fetch flashcards: ' + error.message);
    }
    setLoading(false);
  }, []);

  // UseEffect hook to fetch flashcards when user logs in
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      fetchFlashcards();
    } else {
      setLoading(false);
    }

    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        fetchFlashcards();
      } else {
        setFlashcards([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [fetchFlashcards]);

  // Function to handle form submission (create flashcard)
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
      console.error("Error saving flashcard:", error);
      setError('Failed to save flashcard: ' + error.message);
    }
  };

  // Function to handle flashcard flip
  const handleFlip = (index) => {
    const newFlashcards = [...flashcards];
    newFlashcards[index].flipped = !newFlashcards[index].flipped;
    setFlashcards(newFlashcards);
  };

  // Function to handle flashcard selection (for editing)
  const handleSelectFlashcard = (flashcard) => {
    setSelectedFlashcard(flashcard);
    setEditQuestion(flashcard.question);
    setEditAnswer(flashcard.answer);
  };

  // Function to handle editing a flashcard
  const handleEditFlashcard = async () => {
    if (!selectedFlashcard) return;

    try {
      const flashcardRef = doc(db, 'flashcards', selectedFlashcard.id);
      await updateDoc(flashcardRef, {
        question: editQuestion,
        answer: editAnswer
      });

      setSelectedFlashcard(null); // Close the edit modal
      fetchFlashcards(); // Refresh the flashcards list
    } catch (error) {
      console.error("Error updating flashcard:", error);
      setError('Failed to update flashcard: ' + error.message);
    }
  };

  // Function to handle deleting a flashcard
  const handleDeleteFlashcard = async (id) => {
    try {
      await deleteDoc(doc(db, 'flashcards', id));
      fetchFlashcards(); // Refresh the flashcards list
    } catch (error) {
      console.error("Error deleting flashcard:", error);
      setError('Failed to delete flashcard: ' + error.message);
    }
  };

  return (
    <div className="flashcards-container">
      <h1>Flashcards</h1>
      {error && <p className="error-message">{error}</p>}

      {/* Display message if user is not logged in */}
      {!auth.currentUser && !loading && (
        <p>
          You are currently not signed in. <Link to="/login">Sign in?</Link>
        </p>
      )}

      {/* Create Flashcard Form */}
      {auth.currentUser && (
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
      )}

      {/* Flashcards List */}
      {loading ? (
        <p>Loading...</p>
      ) : flashcards.length > 0 ? (
        <div className="flashcards-list">
          {flashcards.map((flashcard, index) => (
            <div key={flashcard.id} className={`flashcard ${flashcard.flipped ? 'flipped' : ''}`}>
              <div onClick={() => handleFlip(index)}>
                {flashcard.flipped ? (
                  <p><strong>Answer:</strong> {flashcard.answer}</p>
                ) : (
                  <p><strong>Question:</strong> {flashcard.question}</p>
                )}
              </div>
              <button onClick={() => handleSelectFlashcard(flashcard)}>Edit</button>
              <button onClick={() => handleDeleteFlashcard(flashcard.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : auth.currentUser ? (
        <p>No flashcards found. Create one to get started!</p>
      ) : null}

      {/* Edit Flashcard Modal */}
      {selectedFlashcard && (
        <div className="edit-modal">
          <h2>Edit Flashcard</h2>
          <input
            type="text"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            placeholder="Question"
          />
          <input
            type="text"
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            placeholder="Answer"
          />
          <button onClick={handleEditFlashcard}>Save Changes</button>
          <button onClick={() => setSelectedFlashcard(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;