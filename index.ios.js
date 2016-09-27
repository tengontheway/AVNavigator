/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
    View,
    Navigator
} from 'react-native';
import FirstPageComponent from './js/views/FirstPageComponent';

export default class NavigatorDemo extends Component {
  render() {
    let defaultName = 'FirstPageComponent';
    let defaultComponent = FirstPageComponent;
    return (
        <Navigator
            initialRoute={{ name: defaultName, component: defaultComponent }}
            configureScene={(route) => {
              return Navigator.SceneConfigs.VerticalDownSwipeJump;
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.params} navigator={navigator} />
            }} />
    );
  }
}

AppRegistry.registerComponent('NavigatorDemo', () => NavigatorDemo);
