import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import HomeSlider from "../components/HomeSlider";
import Title from "../components/Title";
import MyButtonRow from "../components/MyButtonRow";
import useFetchData from '../components/useFetchData';
import CardBox from '../components/CardBox';

const PerformanceScreen = ({navigation}) => {
  const { data, loading, error } = useFetchData('https://otttelemaerica.com/feed/SubAmerica.json');

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error.message}</Text>;

  return (
    <View style={styles.container}>
      <View
        style={styles.background}
      >
        <HomeSlider navigation={navigation}/>
        <Title />
        <MyButtonRow  navigation={navigation}/>
        <View >
        {data && <CardBox data={data} />}
        </View>
      
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    resizeMode: "cover",
    backgroundColor: "#29bcbb",
  },
  player: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch' to stretch the image
  },
});

export default PerformanceScreen;
