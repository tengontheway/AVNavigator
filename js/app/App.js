/**
 * Created by EvilCode.T on 10/2/16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Navigator
} from 'react-native';

import utils from "../utils/Util"
global.utils = utils

import NavMgr from '../NavMgr'
global.nav_mgr = new NavMgr()

import NavViewsMgr from '../NavViewsMgr'

import MainPage from '../views/MainPage';
import PageContainer from '../PageContainer'
import SubPassParams from '../views/SubPassParams'
import SubAnimPage from '../views/SubAnimPage'
import SubNavPage from '../views/SubNavPage'
import SubModal from '../views/SubModal'
import TestAnim from '../views/TestAnim'
import TestPassParams from '../views/TestPassParams'
import Modal1 from '../views/Modal1'
import SubTabbar from '../views/SubTabbar'
import TabBarHomePage from '../views/TabBarHomePage'
import TabBarSubPage from '../views/TabBarSubPage'
import TestNav from '../views/TestNav'


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

PageContainer.autoMemoryNavigationBarStyles = true

export default class App extends Component {
    constructor(props) {
        super(props)
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

                        statusbarShow: true,
                        barBGColor: 'rgba(0, 0, 0, 1)',
                        barOpacity: 1,
                        titleStylesEx: {fontSize: 20, color: 'white', fontWeight: 'bold'},
                        leftTextColor: 'white',
                        leftImageStylesEx: {width: 15, height: 15, tintColor: "white", marginLeft: 0},
                        leftTextStylesEx: {fontSize: 15},
                        rightTextColor: 'white',
                        rightImageStyleEx: {width: 22, height: 22, tintColor: "white"}
                    }
                }}
                configureScene={(route) => {
                    if (route.animType) return route.animType

                    let anim = nav_mgr.getAnimMgr().getAnim(route.animName)
                    return anim || Navigator.SceneConfigs.VerticalDownSwipeJump;
                }}
                renderScene={(route, navigator) => {
                    return <PageContainer {...route} route={route} navigator={navigator}/>
                }}/>
        );
    }
}