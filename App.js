import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View , Image} from 'react-native';
import {createBottomTabNavigator} from "react-navigation-tabs"
import {createAppContainer} from "react-navigation"
import WriteScreen from "./Screens/writescreen"
import ReadScreen from "./Screens/readscreen"



export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Container/>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
   
  },
});


var TabNavigator = createBottomTabNavigator({
  Write :{screen: WriteScreen},
  Read :{screen: ReadScreen}
},{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:()=>{
      const routeName = navigation.state.routeName
      if(routeName==="Write"){
        return(
          <Image source={require("./images/write.png")} style={{width:30, height:30}}/>
        )
      }
      else if(routeName==="Read"){
        return(
          <Image source={require("./images/read.png")} style={{height:30, width:30}}/>
        )
      }
    }
  })
})

const Container = createAppContainer(TabNavigator)

