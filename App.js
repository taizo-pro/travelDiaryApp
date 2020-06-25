import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'; 

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen'; 
import AddScreen from './screens/AddScreen'; 
import ProfileScreen from './screens/ProfileScreen'; 

export default class App extends React.Component {
  render() {
    // const NavigatorTab = createAppContainer(
    //   createBottomTabNavigator({
    //     welcome: { screen: WelcomeScreen },
    //     main: createBottomTabNavigator({
    //       homeStack: { screen: HomeScreen },
    //       addStack: { screen: AddScreen },
    //       profileStack: {screen: ProfileScreen}
    //     })
    //   })
    // );

    const MainTab = createBottomTabNavigator({
      homeStack: { screen: HomeScreen },
      addStack: { screen: AddScreen },
      profileStack: { screen: ProfileScreen }
    });

    const NavigatorTab = createAppContainer(
      createSwitchNavigator({ 
        welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    );

    return (
      <View style={styles.container}>
        <NavigatorTab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // ↓この文消さないと`react-navigation`が上手く動かず、画面真っ白になっちゃう
    //alignItems: 'center',
    justifyContent: 'center',
  },
});