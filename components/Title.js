import React from 'react'
import { View,Text, StyleSheet } from 'react-native'

const Title = () => {
  return (
    <View style ={styles.container}>
        <Text style = {styles.txt}>
            Welcome To Subamerica
        </Text>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems: 'center',
        margin: 20,
    },
    txt: {
        width: 371,
        height: 40,
        color: 'white',
        font: 'bold',
        fontSize: 26,
        marginLeft: 90,
    }
  });
export default Title