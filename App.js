import React from 'react';
import {StyleSheet, Text, View, Platform, Image} from 'react-native';
import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
  createStackNavigator,
  StackActions,
  NavigationContainer,
} from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';
import Setting1Screen from './screens/Setting1Screen';
import Setting2Screen from './screens/Setting2Screen';

export default class App extends React.Component {
  render() {
    // `HomeStack`について
    const HomeStack = createStackNavigator({
      home: {
        screen: HomeScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Home',
        },
      },
      detail: {
        screen: DetailScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Detail',
        },
      },
    });

    // 1階層目以外はタブを隠す
    HomeStack.navigationOptions = ({navigation}) => {
      return {
        tabBarVisible: navigation.state.index === 0,
      };
    };

    // `AddStack`について
    const AddStack = createStackNavigator({
      add: {
        screen: AddScreen,
        navigationOptions: {
          header: null,
        },
      },
    });

    // 0階層目以外(つまり全階層)はタブを隠す
    AddStack.navigationOptions = ({navigation}) => {
      return {
        tabBarVisible: navigation.state.index === -1, // ←0じゃなくて-1
      };
    };

    // `ProfileStack`について
    const ProfileStack = createStackNavigator({
      profile: {
        screen: ProfileScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Profile',
        },
      },
      setting1: {
        screen: Setting1Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 1',
        },
      },
      setting2: {
        screen: Setting2Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 2',
        },
      },
    });

    // 1階層目以外はタブを隠す
    ProfileStack.navigationOptions = ({navigation}) => {
      return {
        tabBarVisible: navigation.state.index === 0,
      };
    };

    // `HomeStack`, `AddStack`, `ProfileStack`を繋げて`MainTab`に
    const MainTab = createBottomTabNavigator({
      homeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarIcon: ({tintColor}) => (
            <Image
              style={{height: 25, width: 25, tintColor: tintColor}}
              source={require('./assets/home.png')}
            />
          ),
          title: 'Home'
        },
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Image 
              style={{height: 60, width: 60, tintColor: 'deepskyblue'}}
              source={require('./assets/add.png')}
            />
          ),
          title: ''
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image 
              style={{height: 25, width: 25, tintColor: tintColor}}
              source={require('./assets/profile.png')}
            />
          ),
          title: 'Profile'
        }
      },
    }, {
      swipeEnabled: false,
    });

    // `WelcomeScreen`と`MainTab`を繋げて`NavigatorTab`に
    const NavigatorTab = createAppContainer(
      createSwitchNavigator({
        welcome: {screen: WelcomeScreen},
        main: {screen: MainTab},
      }),
    );

    const headerNavigationOptions = {
      headerStyle: {
        backgroundColor: 'deepskyblue',
        marginTop: Platform.OS === 'android' ? 24 : 0,
      },
      headerTitleStyle: {color: 'red'},
      headerTintColor: 'orange',
    };

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
