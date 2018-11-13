import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View
} from 'react-native';
import { createStackNavigator} from 'react-navigation';
import MainPage from '../pages/MainPage';
import SettingPage from '../pages/SettingPage';
import ColorSetting from '../pages/ColorSetting';
import NotifSetting from '../pages/NotifSetting';
import SettingMenu from '../components/Setting'
import AppBar from '../components/Toolbar'

const setNavigationOptions = () => ({
  navigationOptions: ({navigation}) => ({ 
    header: props => <AppBar navigation={navigation} />
  }),
});

const Nav = createStackNavigator({
    Home: { screen: MainPage },
    Settings: { screen: SettingPage },
    ColorSetting: { screen: ColorSetting },
    NotifSetting: { screen: NotifSetting },
},setNavigationOptions());

export default Nav;
