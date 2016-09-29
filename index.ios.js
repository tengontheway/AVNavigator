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
import SubModel from './js/views/SubModel'
import TestAnim from './js/views/TestAnim'
import TestPassParams from './js/views/TestPassParams'
import Modal1 from './js/views/Modal1'


NavViewsMgr.register("views.MainPage", MainPage)
NavViewsMgr.register("views.PageContainer", PageContainer)

NavViewsMgr.register("views.SubPassParams", SubPassParams)
NavViewsMgr.register("views.SubAnimPage", SubAnimPage)
NavViewsMgr.register("views.SubNavPage", SubNavPage)
NavViewsMgr.register("views.SubModel", SubModel)
NavViewsMgr.register("views.TestPassParams", TestPassParams)
NavViewsMgr.register("views.TestAnim", TestAnim)
NavViewsMgr.register("views.Modal1", Modal1)

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
                    // 记录全局ID
                    if (!route.isModal) {
                        let id = NavMgr._glboal_idx
                        route._gid = id
                    }

                    if (route.animType) return route.animType

                    let anim = nav_mgr.getAnimMgr().getAnim(route.animName)
                    return anim || Navigator.SceneConfigs.VerticalDownSwipeJump;
                }}
                renderScene={(route, navigator) => {
                    console.log("--------------------------2")
                    return <PageContainer {...route} route={route} navigator={navigator} kkk={this.state.test} />
                }}/>
        );
    }
}

AppRegistry.registerComponent('AVNavigator', () => AVNavigator);
