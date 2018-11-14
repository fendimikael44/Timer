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
import ThemeSetting from '../pages/ThemeSetting';
import ColorSetting from '../pages/ColorSetting';
import NotifSetting from '../pages/NotifSetting';
// import SettingMenu from '../components/Setting'
import AppBar from '../components/Toolbar'

const setNavigationOptions = (idx) => ({
  navigationOptions: ({navigation}) => ({ 
    header: props => <AppBar navigation={navigation} />
  }),
});

const Nav = createStackNavigator({
    Home: { screen: MainPage, 
      navigationOptions: ({navigation}) => ({ 
        header: props => <AppBar centerElement="Timer" rightElement navigation={navigation} />
      }) 
    },
    Settings: { screen: SettingPage,
      navigationOptions: ({navigation}) => ({ 
        header: props => <AppBar centerElement="Setting" leftElement="arrow-back" navigation={navigation} />
      }) 
    },
    ThemeSetting: { screen: ThemeSetting,
      navigationOptions: ({navigation}) => ({ 
        header: props => <AppBar centerElement="Color Setting" leftElement="arrow-back" navigation={navigation} />
      }) 
    },
    ColorSetting: { screen: ColorSetting,
      navigationOptions: ({navigation}) => ({ 
        header: props => <AppBar centerElement="Theme" leftElement="arrow-back" navigation={navigation} />
      }) 
    },
    NotifSetting: { screen: NotifSetting,
      navigationOptions: ({navigation}) => ({ 
        header: props => <AppBar centerElement="Notification" leftElement="arrow-back" navigation={navigation} />
      }) 
    },
});

export default Nav;
