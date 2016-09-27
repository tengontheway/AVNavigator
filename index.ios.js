/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 *
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Navigator
} from 'react-native';

import utils from "./js/utils/Util"
global.utils = utils

import FirstPageComponent from './js/views/FirstPageComponent';

class AVNavigator extends Component {
  render() {
    let defaultName = 'FirstPageComponent';
    let defaultComponent = FirstPageComponent;
    return (
        <Navigator
            ref={nav => global.nav = nav}
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.VerticalDownSwipeJump;
            }}
            renderScene={(route, navigator) => {
              let Com = route.component;

              return <Com  {...route.params} navigator={navigator} />
            }} />
    );
  }
}

AppRegistry.registerComponent('AVNavigator', () => AVNavigator);
