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

import {NavMgr, PageContainer} from '../navbar'
global.nav_mgr = new NavMgr()

// screen related book keepi
import { registerScreens } from '../views_register';
registerScreens();

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