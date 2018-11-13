import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Nav from './src/navigations'
import { Provider } from 'react-redux'
import myStore from './src/config/store'

class App extends Component {
  render() {
    return (
      <Provider store={myStore} >
          <Nav />
      </Provider>
    );
  }
}

export default App
