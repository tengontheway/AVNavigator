/**
 * Created by Qx on 9/28/16.
 */
import React, {Component} from 'react'
import  {
    View,
    PropTypes,
    Modal,
    Text,
    TouchableWithoutFeedback,
    Dimensions,
    StyleSheet
} from 'react-native';
// import { match } from 'react-router';
// import routesConfig from '../routes';

import NavigationBar from './NavigationBar'
import NavViewsMgr from './NavViewsMgr'

const { width, height } = Dimensions.get('window');

// 钩子函数
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

function getLastRoute() {
    let index = this.state.routeStack.length-1
    let last_idx = index - 1
    if (last_idx >= 0) {
        return this.state.routeStack[last_idx]
    }

    return null
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign  */
export function hookNavigator(navigator) {
    if (!navigator._hookedForDialog) {
        navigator._hookedForDialog = true;

        navigator._disableScene = hookedDisableScene.bind(navigator);
        navigator.getLastRoute = getLastRoute.bind(navigator)
    }
}

export default class PageContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            transparent: true,
            visible: true
        }

    }

    componentWillMount() {
        hookNavigator(this.props.navigator);
    }

    _onPressLeftItem() {
        const {route} = this.props
        if (route && route.navBarStyle && route.navBarStyle.onPressLeft) {
            route.navBarStyle.onPressLeft()
            return
        }

        nav_mgr.pop()
    }

    /**
     *  点击NavigationBar右边的按钮
     **/
    _onPressRightItem() {
        const {route} = this.props
        if (route && route.navBarStyle && route.navBarStyle.onPressRight) {
            route.navBarStyle.onPressRight()
        }
    }

    _onCloseModal() {
        nav_mgr.pop()
    }

    componentWillUnmount() {
        if (this.core_compnent) {
            if (this.core_compnent.onExit && typeof this.core_compnent.onExit === 'function') {
                this.core_compnent.onExit()
            }
        }
    }

    render() {
        const {route, navigator} = this.props
        const Component = NavViewsMgr.getView(this.props.screen)
        const navBarHidden = route.navBarHidden === undefined ? true : route.navBarHidden
        const navBarStyle = route.navBarStyle
        let is_modal = route.isModal

        let last_title = ''
        let last_route = navigator.getLastRoute()
        if (last_route && last_route.navBarStyle && last_route.navBarStyle.title) {
            last_title = last_route.navBarStyle.title
        }

        return (
            <View style={[{flex: 1}]}>
                {/* 模态对话框*/}
                {
                    is_modal ?
                        <TouchableWithoutFeedback
                            onPress={this._onCloseModal.bind(this)}
                        >
                            <View style={styles.overlay} />
                        </TouchableWithoutFeedback>
                        :
                        null
                }

                {/* 导航栏 */}
                {
                    !navBarHidden ?
                        <NavigationBar
                            statusbarShow= {true}
                            barBGColor='rgba(0, 255, 0, 0.5)'
                            barOpacity={0.5}

                            title='这个是标题'
                            titleStylesEx={{fontSize: 22, color: 'red', fontWeight: 'bold'}}

                            leftImageSource={require('./nav_back.png')}
                            leftItemTitle={last_title}
                            leftTextColor='#3393F2'
                            leftImageStylesEx={{width: 15, height: 15, tintColor: "#3393F2", marginLeft: 0}}
                            leftTextStylesEx={{fontSize: 15}}

                            rightItemTitle='下一页'
                            rightTextColor='#3393F2'
                            rightImageSource={require('./views/img/tab_phone_sel.png')}
                            rightImageStyleEx={{width: 22, height: 22, tintColor: "#3393F2"}}

                            {...navBarStyle}
                            leftItemFunc={this._onPressLeftItem.bind(this)}
                            rightItemFunc={this._onPressRightItem.bind(this)}
                        />
                        :
                        null
                }

                {/* 自定义组件 */}
                <Component
                    ref={com => {
                        {/*this.core_compnent = com*/}

                        {/*nav_mgr.bindComponent(com, this.props.route)*/}
                    }}
                    {...route.params}
                    navigator={navigator}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'rgba(255,0,0,0.6)',
    },
})
