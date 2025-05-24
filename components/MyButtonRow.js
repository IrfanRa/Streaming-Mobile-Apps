import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MyButtonRow = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyList')}>
      <Icon name="playlist-add" size={30} color="white" />
        <Text style={styles.buttonText}>My List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Player', { videoUrl: 'https://hls-m5ixdesk-livepush.akamaized.net/live_cdn/nsDTmMQ796J8Qk/emvJyyEvXzer9Rw-/index.m3u8' })}
      >
        <Icon name="play-arrow" size={30} color="white" />
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InfoScreen')}>
      <Icon name="info" size={30} color="white" />
        <Text style={styles.buttonText}>Info</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 380,
    height: 50,
    padding: 10,
    borderRadius: 15,
    marginLeft: 50,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 3,
    fontSize: 20,
  },
});

export default MyButtonRow;
