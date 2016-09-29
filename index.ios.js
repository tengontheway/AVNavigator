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
import PassParams from './js/views/PassParams'
import SecondPageComponent from './js/views/SecondPageComponent'
import SubAnimPage from './js/views/SubAnimPage'
import SubNavPage from './js/views/SubNavPage'
import TestAnim from './js/views/TestAnim'

NavViewsMgr.register("views.MainPage", MainPage)
NavViewsMgr.register("views.PageContainer", PageContainer)

NavViewsMgr.register("views.PassParams", PassParams)
NavViewsMgr.register("views.SecondPageComponent", SecondPageComponent)
NavViewsMgr.register("views.SubAnimPage", SubAnimPage)
NavViewsMgr.register("views.SubNavPage", SubNavPage)
NavViewsMgr.register("views.TestAnim", TestAnim)

class AVNavigator extends Component {
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

AppRegistry.registerComponent('AVNavigator', () => AVNavigator);
