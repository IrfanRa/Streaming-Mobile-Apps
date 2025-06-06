// Player.js

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Player = ({ route }) => {
  const { videoUrl } = route.params;
  const isHls = /\.m3u8(\?.*)?$/.test(videoUrl);
  const videoRef = useRef(null);
  const navigation = useNavigation();
  const [paused, setPaused] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const controlTimeoutRef = useRef(null);
  const [isLandscape, setIsLandscape] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    Orientation.lockToLandscape();
    setIsLandscape(true);

    const subscription = Dimensions.addEventListener('change', handleDimensionsChange);

    return () => {
      Orientation.unlockAllOrientations();
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (showControls) {
      if (controlTimeoutRef.current) {
        clearTimeout(controlTimeoutRef.current);
      }
      controlTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  }, [showControls]);

  const handleDimensionsChange = ({ window }) => {
    setVideoDimensions({
      width: window.width,
      height: window.height,
    });
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const handlePausePlay = () => {
    if (isHls) {
      return;
    }
    setPaused(!paused);
    setShowControls(true);
  };

  const handleForward = () => {
    if (isHls) {
      return;
    }
    videoRef.current.seek(currentTime + 10);
    setShowControls(true);
  };

  const handleBack = () => {
    if (isHls) {
      return;
    }
    videoRef.current.seek(Math.max(currentTime - 10, 0));
    setShowControls(true);
  };

  const handleScreenPress = () => {
    setShowControls(!showControls);
  };

  const handleToggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait();
      setIsLandscape(false);
    } else {
      Orientation.lockToLandscape();
      setIsLandscape(true);
    }
    setShowControls(true);
  };

  const handleError = () => {
    setError('Error loading video');
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleScreenPress}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={{
              width: videoDimensions.width,
              height: videoDimensions.height,
            }}
            resizeMode="contain"
            paused={paused}
            onProgress={handleProgress}
            onError={handleError}
          />

          {error && (
            <View style={styles.errorContainer} pointerEvents="none">
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {showControls && (
            <>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={30} color="white" />
              </TouchableOpacity>

              {!isHls && (
                <View style={styles.controls}>
                  <TouchableOpacity onPress={handleBack} style={styles.controlButton}>
                    <Icon name="replay-10" size={40} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handlePausePlay} style={styles.controlButton}>
                    {paused ? (
                      <Icon name="play-arrow" size={40} color="white" />
                    ) : (
                      <Icon name="pause" size={40} color="white" />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
                    <Icon name="forward-10" size={40} color="white" />
                  </TouchableOpacity>
                </View>
              )}

              <TouchableOpacity
                style={styles.orientationButton}
                onPress={handleToggleOrientation}>
                <Icon name="screen-rotation" size={30} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    alignSelf: 'center',
  },
  controlButton: {
    paddingHorizontal: 20,
  },
  orientationButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  errorContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
});

export default Player;
