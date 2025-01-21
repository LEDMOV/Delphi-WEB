// src/components/SignOutButton.js
import React from 'react';
import { signOutUser } from '../firebase';

const SignOutButton = () => {
  const handleSignOut = async () => {
    try {
      await signOutUser();
      alert("Signed out successfully!");
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Failed to sign out.");
    }
  };

  return (
    <button onClick={handleSignOut} className="sign-out-button">
      Sign Out
    </button>
  );
};

export default SignOutButton;
