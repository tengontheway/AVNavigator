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

export default  class SubAnimPage extends Component {
    constructor(props) {
        super(props)
    }

    onPress(anim_name) {
        // 方式1：传递动画名字(推荐)
        nav_mgr.push({
            screen: 'views.TestAnim',
            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
            params: {
            },
            navBarHidden: false,
            navBarStyle: {
                title: anim_name,
                isShowRight: false,
            },
            animName: anim_name,
        })

        // 方式2: 传递动画类型
        /**
         nav_mgr.push({
            screen: 'views.TestAnim',
            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
            params: {
            },
            navBarHidden: false,
            navBarStyle: {
                title: anim_name,
                isShowRight: false,
            },
            animType: Navigator.SceneConfigs.VerticalDownSwipeJump,
        })
         */
    }

    render() {
        let anims = nav_mgr.getAnimMgr().getAnimList()
        let anim_names = Object.keys(anims)   // PushFromRight、FloatFromRight......
        let values = Object.values(anims)    // Navigator.SceneConfigs.PushFromRight......

        let children = anim_names.map((anim_name, idx)=> {
            return <Text key={idx} onPress={this.onPress.bind(this, anim_name)}>{anim_name}</Text>
        })

        return (
            <View style={{flex:1}}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    {
                        children
                    }

                    <Text>两种跳转方法，具体参考代码</Text>

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