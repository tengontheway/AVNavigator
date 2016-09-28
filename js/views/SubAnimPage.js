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
        let anim = nav_mgr.getAnimMgr().getAnim(anim_name)
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

            animationType: anim
        })
    }

    render() {
        let anims = nav_mgr.getAnimMgr().getAnimList()
        let keys = Object.keys(anims)
        let values = Object.values(anims)

        let items = keys.map((item, idx)=> {
            let name = `${keys[idx]}`
            return <Text key={idx} onPress={this.onPress.bind(this, item)}>{name}</Text>
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
                        items
                    }
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