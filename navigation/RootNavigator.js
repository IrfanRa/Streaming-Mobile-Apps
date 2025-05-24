// navigation/RootNavigator.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

// screens
import SplashScreen from '../Screens/SplashScreen';
import HomeScreen from '../Screens/HomeScreen';
import Player from '../Screens/Player';
import MyList from '../Screens/MyList';
import InfoScreen from '../Screens/InfoScreen';

import LoginScreen from '../Screens/auth/LoginScreen';
import SignupScreen from '../Screens/auth/SignupScreen';
import ForgotPasswordScreen from '../Screens/auth/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Player" component={Player} />
    <Stack.Screen name="MyList" component={MyList} />
    <Stack.Screen name="InfoScreen" component={InfoScreen} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
  </Stack.Navigator>
);

export default function RootNavigator() {
  const { user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // keep SplashScreen up for 2 seconds (adjust as desired)
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      {showSplash
        ? <SplashScreen />
        : user
          ? <AppStack />
          : <AuthStack />
      }
    </NavigationContainer>
  );
}
