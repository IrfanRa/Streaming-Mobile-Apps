import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MusicScreen from '../Screens/MusicScreen'; 
import PerformanceScreen from '../Screens/PerformanceScreen';
import PodcastsScreen from '../Screens/PodcastsScreen';

const Tab = createMaterialTopTabNavigator();

const TopTabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: '#29bcbb' }, // Indicator color
        tabBarActiveTintColor: '#29bcbb', // Active tab label color
        tabBarInactiveTintColor: 'gray', // Inactive tab label color
        tabBarPressColor: '#29bcbb', // Ripple effect color on Android
        tabBarStyle: { backgroundColor: 'white' }, // Tab bar background color
      }}
    >
      <Tab.Screen
        name="Music"
        component={MusicScreen}
      />
      <Tab.Screen
        name="Performance"
        component={PerformanceScreen}
      />
      <Tab.Screen
        name="Podcasts"
        component={PodcastsScreen}
      />
    </Tab.Navigator>
  );
};

export default TopTabBar;
