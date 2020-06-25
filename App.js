import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  StackActions, 
  NavigationContainer
} from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen'; // ←追記部分
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';
import Setting1Screen from './screens/Setting1Screen'; // ←追記部分
import Setting2Screen from './screens/Setting2Screen'; // ←追記部分

export default class App extends React.Component {
  render() {
    // `HomeStack`について
    const HomeStack = createStackNavigator({
      home: { screen: HomeScreen },
      detail: { screen: DetailScreen }
    });

    // 1階層目以外はタブを隠す
    HomeStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };


    // `AddStack`について
    const AddStack = createStackNavigator({
      add: { screen: AddScreen }
    });

    // 0階層目以外(つまり全階層)はタブを隠す
    AddStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === -1) // ←0じゃなくて-1
      };
    };


    // `ProfileStack`について
    const ProfileStack = createStackNavigator({
      profile: { screen: ProfileScreen },
      setting1: { screen: Setting1Screen },
      setting2: { screen: Setting2Screen }
    });

    // 1階層目以外はタブを隠す
    ProfileStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };


    // `HomeStack`, `AddStack`, `ProfileStack`を繋げて`MainTab`に
    const MainTab = createBottomTabNavigator({
      homeStack: { screen: HomeStack },
      addStack: { screen: AddStack },
      profileStack: { screen: ProfileStack }
    });


    // `WelcomeScreen`と`MainTab`を繋げて`NavigatorTab`に
    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        welcome: { screen: WelcomeScreen },
        main: { screen: MainTab }
      })
    );


    // `NavigatorTab`を描画
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
