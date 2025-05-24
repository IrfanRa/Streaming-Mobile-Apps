import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import TopTabBar from '../components/TopTabBar';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.overlay}>
      <Header navigation={navigation} />
      <TopTabBar />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default HomeScreen;
