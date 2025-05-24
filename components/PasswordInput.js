import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../theme/colors';

export default function PasswordInput({
  value,
  placeholder,
  onChangeText,
  error,          // string error message
  placeholderTextColor = colors.primary,
  inputStyle = {},
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={[styles.inputRow, error && styles.errorBorder]}>
        <TextInput
          style={[styles.input, { color: colors.textDark }, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor}
          secureTextEntry={!visible}
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setVisible(v => !v)}>
          <MaterialIcons
            name={visible ? 'visibility' : 'visibility-off'}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { marginVertical: 8 },
  inputRow:     {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input:        { flex: 1, paddingVertical: 10 },
  errorBorder:  { borderColor: 'crimson' },
  errorText:    { color: 'crimson', marginTop: 4, marginLeft: 4 },
});
