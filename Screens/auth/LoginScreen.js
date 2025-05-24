import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  ActivityIndicator, TextInput
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { colors } from '../../theme/colors';
import PasswordInput from '../../components/PasswordInput';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();
  const [email,   setEmail]   = useState('');
  const [pwd,     setPwd]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      await login(email.trim(), pwd);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcom To Subamerica</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {/* Email Field Label */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor={colors.primary}
        value={email}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Password Field Label */}
      <Text style={styles.label}>Password</Text>
      <PasswordInput
        placeholder="Password"
        placeholderTextColor={colors.primary}
        value={pwd}
        onChangeText={setPwd}
        error={null}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Forgot')}>
        <Text style={styles.link}>Forgot password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color={colors.textLight}/>
          : <Text style={styles.buttonText}>Log In</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.link}>Don’t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:  { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: colors.background },
  title:      { fontSize: 28, fontWeight: 'bold', color: colors.primary, marginBottom: 32, textAlign: 'center' },
  label:      { color: colors.textDark, fontSize: 14, marginBottom: 4 },
  input:      {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    color: colors.textDark,      // ensures entered text is visible
  },
  button:     { backgroundColor: colors.primary, padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  buttonText: { color: colors.textLight, fontSize: 18, fontWeight: 'bold' },
  link:       { color: colors.primary, textAlign: 'center', marginTop: 16 },
  error:      { color: 'crimson', marginBottom: 12, textAlign: 'center' },
});
