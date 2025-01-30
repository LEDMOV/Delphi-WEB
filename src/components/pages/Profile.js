import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [displayName, setDisplayName] = useState('');
  const [realName, setRealName] = useState('');
  const [studying, setStudying] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [photoURL, setPhotoURL] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (auth.currentUser) {
        const docRef = doc(db, 'users', auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setDisplayName(data.displayName || '');
          setRealName(data.realName || '');
          setStudying(data.studying || '');
          setPhotoURL(data.photoURL || '');
        }
      }
    };

    fetchProfile();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      let newPhotoURL = photoURL;

      // Upload new profile picture if selected
      if (profilePic) {
        const storageRef = ref(storage, `profile_pictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, profilePic);
        newPhotoURL = await getDownloadURL(storageRef);
      }

      // Update Firebase Authentication profile
      await updateProfile(auth.currentUser, { displayName, photoURL: newPhotoURL });

      // Update Firestore profile data
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        displayName,
        realName,
        studying,
        photoURL: newPhotoURL
      }, { merge: true });

      setPhotoURL(newPhotoURL);
      setSuccess('Profile updated successfully!');
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error); // Debugging line
      setError('Failed to update profile: ' + error.message);
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      setError('Failed to sign out: ' + error.message);
    }
  };

  return (
    <div className="profile-page">
      <h1 className="profile-header">Profile</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="profile-content">
        <img
          src={photoURL || 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'}
          alt="Profile"
          className="profile-pic-large"
          onError={(e) => {
            e.target.src = 'https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg'; // Fallback to placeholder if the image fails to load
          }}
        />
        <div className="profile-info">
          <h2>{displayName}</h2>
          <p>{realName}</p>
          <p>{studying}</p>
        </div>
      </div>
      <button className="edit-button" onClick={() => setIsEditMode(true)}>Edit Profile</button>
      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      {isEditMode && (
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
          <button type="button" className="cancel-button" onClick={() => setIsEditMode(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default Profile;