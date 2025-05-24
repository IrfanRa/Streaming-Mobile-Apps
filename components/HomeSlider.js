import React from 'react';
import { StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import ViewSlider from 'react-native-view-slider';


const { width } = Dimensions.get('window');

function HomeSlider({ navigation }) {
  const images = [
    'https://otttelemaerica.com/feed/SubAmericaThumb.jpg',
    require('../assets/images/icon.jpeg'),
    'https://otttelemaerica.com/feed/SubAmericaThumb.jpg',
  ];

  const handleImagePress = (imageUri) => {
    navigation.navigate('Player', { videoUrl: imageUri });
  };

  return (
    <ViewSlider
      renderSlides={
        <>
          {images.map((image, index) => (
            <TouchableOpacity key={index} style={styles.viewBox} onPress={() => handleImagePress(image)}>
              <Image source={typeof image === 'string' ? { uri: image } : image} style={{ height: 200, width }} />
            </TouchableOpacity>
          ))}
        </>
      }
      style={styles.slider}
      height={175}
      slideCount={images.length}
      dots={true}
      dotActiveColor='#29bcbb'
      dotInactiveColor='lightblue'
      dotsContainerStyle={styles.dotContainer}
      autoSlide={false}
      slideInterval={3000}
    />
  );
};

const styles = StyleSheet.create({
  viewBox: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    width: width,
    padding: 10,
    alignItems: 'center',
    height: 150,
  },
  slider: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#29bcbb',
  },
  dotContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 3,
  },
});

export default HomeSlider;
