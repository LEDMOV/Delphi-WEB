// src/components/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import './Profile.css';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [realName, setRealName] = useState('');
  const [studying, setStudying] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setDisplayName(data.displayName || '');
        setRealName(data.realName || '');
        setStudying(data.studying || '');
      }
    };

    if (auth.currentUser) {
      fetchProfile();
    }
  }, []);

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let photoURL = auth.currentUser.photoURL;

      if (profilePic) {
        const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, profilePic);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(auth.currentUser, { displayName, photoURL });
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName,
        realName,
        studying,
        photoURL
      });

      setSuccess('Profile updated successfully!');
    } catch (error) {
      setError('Failed to update profile: ' + error.message);
    }
  };

  return (
    <div className="profile-container">
      <h1>Update Profile</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form className="profile-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
          required
        />
        <input
          type="text"
          value={realName}
          onChange={(e) => setRealName(e.target.value)}
          placeholder="Real Name (Optional)"
        />
        <input
          type="text"
          value={studying}
          onChange={(e) => setStudying(e.target.value)}
          placeholder="What You're Studying"
        />
        <input
          type="file"
          onChange={handleFileChange}
        />
        <button type="submit" className="profile-button">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
