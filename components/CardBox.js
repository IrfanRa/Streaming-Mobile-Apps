// CardBox.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

const CardBox = ({ data }) => {
  const navigation = useNavigation();

  const renderCard = ({ item }) => (
    <TouchableOpacity 
      key={item.id}
      style={styles.card}
      onPress={() => navigation.navigate('Player', { videoUrl: item.content.videos[0].url })}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <Icon name="play-arrow" size={70} color="gray" style={styles.playIcon} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.shortDescription}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={data.liveFeeds}
      renderItem={renderCard}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginLeft: 55,
    marginTop:20,
  },
  card: {
    width: 170,
    height: 160,
    margin: 10,
    backgroundColor: '#29bcbb',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
  },
  thumbnailContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playIcon: {
    position: 'absolute',
  },
  title: {
    padding: 2,
    fontSize: 14,
    fontWeight: 'semibold',
    color: 'white',
    marginLeft: 5,
  },
  description: {
    padding: 0,
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
});

export default CardBox;
