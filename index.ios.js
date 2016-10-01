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

import NavMgr from './js/NavMgr'
global.nav_mgr = new NavMgr()

import NavViewsMgr from './js/NavViewsMgr'

import MainPage from './js/views/MainPage';
import PageContainer from './js/PageContainer'
import SubPassParams from './js/views/SubPassParams'
import SubAnimPage from './js/views/SubAnimPage'
import SubNavPage from './js/views/SubNavPage'
import SubModal from './js/views/SubModal'
import TestAnim from './js/views/TestAnim'
import TestPassParams from './js/views/TestPassParams'
import Modal1 from './js/views/Modal1'
import SubTabbar from './js/views/SubTabbar'
import TabBarHomePage from './js/views/TabBarHomePage'
import TabBarSubPage from './js/views/TabBarSubPage'
import TestNav from './js/views/TestNav'


NavViewsMgr.register("views.MainPage", MainPage)
NavViewsMgr.register("views.PageContainer", PageContainer)

NavViewsMgr.register("views.SubPassParams", SubPassParams)
NavViewsMgr.register("views.SubAnimPage", SubAnimPage)
NavViewsMgr.register("views.SubNavPage", SubNavPage)
NavViewsMgr.register("views.SubModal", SubModal)
NavViewsMgr.register("views.SubTabbar", SubTabbar)
NavViewsMgr.register("views.TestPassParams", TestPassParams)
NavViewsMgr.register("views.TestAnim", TestAnim)
NavViewsMgr.register("views.Modal1", Modal1)
NavViewsMgr.register("views.TabBarHomePage", TabBarHomePage)
NavViewsMgr.register("views.TabBarSubPage", TabBarSubPage)
NavViewsMgr.register("views.TestNav", TestNav)


/**

 const SCREEN_HEIGHT = Dimensions.get('window').height;
 const SCENE_DISABLED_NATIVE_PROPS = {
  pointerEvents: 'none',
  style: {
    top: SCREEN_HEIGHT,
    bottom: -SCREEN_HEIGHT,
    opacity: 0,
  },
};

 // Hook navigator method
 function hookedDisableScene(sceneIndex) {
  const sceneConstructor = this.refs[`scene_${sceneIndex}`];
  const nextRoute = this.state.routeStack[sceneIndex + 1];

  if (nextRoute && nextRoute.isModal) {
    sceneConstructor.setNativeProps({
      pointerEvents: 'none',
    });
  } else {
    sceneConstructor.setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
  }
}

 // eslint-disable no-underscore-dangle
// eslint-disable no-param-reassign
export function hookNavigator(navigator) {
    if (!navigator._hookedForDialog) {
        navigator._hookedForDialog = true;
        navigator._disableScene = hookedDisableScene.bind(navigator);
    }
}

 */

class AVNavigator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            test: 1
        }

        setInterval(()=>{
            this.setState({
                test: this.state.test+1
            })
        }, 1000)
    }

    render() {
        return (
            <Navigator
                ref={nav => global._global_nav = nav}
                initialRoute={{
                    screen: 'views.MainPage',
                    navBarHidden: false,
                    navBarStyle: {
                        title: '首页',
                        isShowLeft: false,
                        isShowRight: false,
                    }
                }}
                configureScene={(route) => {
                    if (route.animType) return route.animType

                    let anim = nav_mgr.getAnimMgr().getAnim(route.animName)
                    return anim || Navigator.SceneConfigs.VerticalDownSwipeJump;
                }}
                renderScene={(route, navigator) => {
                    return <PageContainer {...route} route={route} navigator={navigator} kkk={this.state.test} />
                }}/>
        );
    }
}

AppRegistry.registerComponent('AVNavigator', () => AVNavigator);
