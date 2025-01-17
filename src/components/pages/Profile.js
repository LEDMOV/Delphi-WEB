// src/components/pages/Profile.js
import React, { useState } from 'react';
import { auth, storage } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import './Profile.css';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (profilePic) {
        const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, profilePic);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(auth.currentUser, { displayName, photoURL });
      } else {
        await updateProfile(auth.currentUser, { displayName });
      }
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
