// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

// friendly messages for common errors
const ERROR_MESSAGES = {
  'auth/invalid-email':         'Please enter a valid email address.',
  'auth/user-not-found':         'No account found with that email.',
  'auth/wrong-password':         'Incorrect password. Try again.',
  'auth/email-already-in-use':   'This email is already registered.',
  'auth/weak-password':          'Password should be at least 6 characters.',
  'auth/network-request-failed': 'Network error. Check your connection.',
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(u => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // wrap native module calls, map errors
  const signup = async (email, password) => {
    try {
      const { user: newUser } = await auth().createUserWithEmailAndPassword(email, password);
      // send verification email
      await newUser.sendEmailVerification();
      return newUser;
    } catch (err) {
      const msg = ERROR_MESSAGES[err.code] || 'Unable to sign up. Please try again.';
      throw new Error(msg);
    }
  };

  const login = async (email, password) => {
    try {
      const { user: u } = await auth().signInWithEmailAndPassword(email, password);
      if (!u.emailVerified) {
        await auth().signOut();
        throw new Error('Please verify your email before logging in. You’ll receive a link in your inbox.');
      }
      return u;
    } catch (err) {
      const msg = err.message.includes('verify your email')
        ? err.message
        : ERROR_MESSAGES[err.code] || 'Unable to log in. Please try again.';
      throw new Error(msg);
    }
  };

  const logout = () => auth().signOut();
  const resetPw = async email => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (err) {
      const msg = ERROR_MESSAGES[err.code] || 'Unable to reset password.';
      throw new Error(msg);
    }
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, resetPw }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
