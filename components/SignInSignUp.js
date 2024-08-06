// components/SignInSignUp.js
import React, { useState } from 'react';
import { auth, firestore } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Box, Button, TextField, Typography } from '@mui/material';

const SignInSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(firestore, 'users', user.uid), {
        email,
      });
      alert('User signed up and added to database');
    } catch (error) {
      console.error('Error signing up:', error);
      alert('Error signing up: ' + error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('User signed in');
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in: ' + error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
      <Typography variant="h4">{isSigningUp ? 'Sign Up' : 'Sign In'}</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={isSigningUp ? handleSignUp : handleSignIn}>
        {isSigningUp ? 'Sign Up' : 'Sign In'}
      </Button>
      <Button onClick={() => setIsSigningUp(!isSigningUp)} color="secondary">
        {isSigningUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
      </Button>
    </Box>
  );
};

export default SignInSignUp;
