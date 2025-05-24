// components/Header.js
import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../context/AuthContext';

const Header = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const { logout } = useAuth();

  const handleSearch = () => {
    console.log('Search text:', searchText);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      Alert.alert('Error', 'Unable to log out. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.jpg')}
        style={styles.logo}
      />

      <View style={styles.actions}>
        {isSearchVisible && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
        )}

        <TouchableOpacity onPress={() => setSearchVisible(v => !v)} style={styles.iconBtn}>
          <MaterialIcons name="search" size={24} color="#29bcbb" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={styles.iconBtn}>
          <MaterialIcons name="logout" size={24} color="#29bcbb" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 },
  logo:      { width: 150, height: 40, resizeMode: 'contain' },
  actions:   { flexDirection: 'row', alignItems: 'center' },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 5, marginRight: 10, width: 200 },
  iconBtn:     { marginHorizontal: 6 },
});

export default Header;
