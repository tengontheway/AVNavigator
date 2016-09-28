/**
 * Created by Qx on 9/28/16.
 */
/**
 * 测试动画
 * Created by Qx on 9/27/16.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Navigator
} from 'react-native';

export default  class TestAnim extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{flex:1}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'red'
                }}>
                    <Text>用于测试所有的动画</Text>
                    <Text>`Navigator.SceneConfigs.PushFromRight (默认)
                        Navigator.SceneConfigs.FloatFromRight
                        Navigator.SceneConfigs.FloatFromLeft
                        Navigator.SceneConfigs.FloatFromBottom
                        Navigator.SceneConfigs.FloatFromBottomAndroid
                        Navigator.SceneConfigs.FadeAndroid
                        Navigator.SceneConfigs.HorizontalSwipeJump
                        Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
                        Navigator.SceneConfigs.VerticalUpSwipeJump
                        Navigator.SceneConfigs.VerticalDownSwipeJump`</Text>
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