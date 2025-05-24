import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Info Screen items coming soon</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29bcbb',
  },
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});

export default InfoScreen;
