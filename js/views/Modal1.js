/**
 * 子页面
 * Created by Qx on 9/27/16.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator,
    Dimensions
} from 'react-native';


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

export default  class Modal1 extends Component {
    constructor(props) {
        super(props)
    }

    onPress1() {
        nav_mgr.pop()
    }

    componentWillMount() {
        hookNavigator(this.context.navigator);
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text onPress={this.onPress1.bind(this)}>关闭对话框</Text>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});