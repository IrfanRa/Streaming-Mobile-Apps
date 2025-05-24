import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const MyList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>MyList items coming soon</Text>
      
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

export default MyList;
