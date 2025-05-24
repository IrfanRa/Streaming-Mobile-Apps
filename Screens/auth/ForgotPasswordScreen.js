//Screens/auth/ForgotPasswordScreen.js

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';

export default function ForgotPasswordScreen({ navigation }) {
  const { resetPw } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async () => {
    setLoading(true);
    setError(null);
    try {
      await resetPw(email.trim());
      setMsg('Password reset email sent');
    } catch (e) {
      setError(e.message.replace('Firebase:', '').trim());
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      {msg && <Text style={styles.success}>{msg}</Text>}

      <TextInput
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleReset} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={colors.textLight} />
        ) : (
          <Text style={styles.buttonText}>Send Reset Link</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
    title: { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 32, textAlign: 'center' },
    input: { borderWidth: 1, borderColor: colors.primary, borderRadius: 8, padding: 12, marginVertical: 8 },
    button: { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
    buttonText: { color: colors.textLight, fontSize: 18, fontWeight: 'bold' },
    link: { color: colors.primary, textAlign: 'center', marginTop: 16 },
    error: { color: 'crimson', marginBottom: 12, textAlign: 'center' },
  });
