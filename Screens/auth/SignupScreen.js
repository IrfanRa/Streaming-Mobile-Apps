// Screens/auth/SignupScreen.js
import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, Alert,TextInput
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import PasswordInput from '../../components/PasswordInput';

export default function SignupScreen({ navigation }) {
  const { signup, logout } = useAuth();
  const [email,   setEmail]   = useState('');
  const [pwd,     setPwd]     = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  // inline validation errors
  const [pwdError,     setPwdError]     = useState('');
  const [confirmError, setConfirmError] = useState('');

  function validatePassword(p) {
    // at least 8 chars, 1 number, 1 special char
    return /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(p);
  }

  const handleSignup = async () => {
    // reset errors
    setError(null);
    setPwdError(''); setConfirmError('');

    // inline checks
    if (!validatePassword(pwd)) {
      return setPwdError('Must be ≥8 chars, include a number & special char');
    }
    if (pwd !== confirm) {
      return setConfirmError('Passwords do not match');
    }

    setLoading(true);
    try {
      // 1. create account & send Firebase verification
      await signup(email.trim(), pwd);

      // 2. immediately sign them out so AuthStack remains active
      await logout();

      // 3. prompt the user
      Alert.alert(
        'Verify Your Email',
        'A verification link has been sent to your inbox. Please check your email and click the link to activate your account.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login'),
          },
        ]
      );
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {error && <Text style={styles.error}>{error}</Text>}



      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor={colors.primary}
      />

      <Text style={styles.label}>Password</Text>
      <PasswordInput
        placeholder="Password"
        value={pwd}
        onChangeText={setPwd}
        error={pwdError}
        style={styles.input}
        placeholderTextColor={colors.primary}
      />

      <Text style={styles.label}>Confirm Password</Text>
      <PasswordInput
        placeholder="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        error={confirmError}
        style={styles.input}
        placeholderTextColor={colors.primary}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color={colors.textLight}/>
          : <Text style={styles.buttonText}>Sign Up</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Already have an account? Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

// (You’ll need to import Text and TextInput from 'react-native' or your custom wrapper.)
const styles = StyleSheet.create({
  container:  { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  title:      { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 32, textAlign: 'center' },
  input:      { borderWidth: 1, borderColor: colors.primary, borderRadius: 8, padding: 12, marginVertical: 8, color: colors.textDark },
  button:     { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: colors.textLight, fontSize: 18, fontWeight: 'bold' },
  link:       { color: colors.primary, textAlign: 'center', marginTop: 16 },
  error:      { color: 'crimson', marginBottom: 12, textAlign: 'center' },
});
