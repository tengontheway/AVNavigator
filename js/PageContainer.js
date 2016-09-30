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

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign  */
export function hookNavigator(navigator) {
    if (!navigator._hookedForDialog) {
        navigator._hookedForDialog = true;
        navigator._disableScene = hookedDisableScene.bind(navigator);
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
        nav_mgr.pop()
    }

    _onPressRightItem() {

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
                            title='这个是标题'
                            leftImageSource={require('./nav_back.png')}
                            leftStylesEx={{width: 15, height: 15, tintColor: "#3393F2"}}
                            rightItemTitle='下一页'
                            rightTextColor='#3393F2'
                            leftItemFunc={this._onPressLeftItem.bind(this)}
                            rightItemFunc={this._onPressRightItem.bind(this)}
                            {...navBarStyle}
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
