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
    Navigator
} from 'react-native';


export default  class SubTabbar extends Component {
    constructor(props) {
        super(props)
    }

    onPress1() {
        let _this = this

        const {navigator} = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                screen: 'views.TabBarHomePage',
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {},
                navBarHidden: true,
                navBarStyle: {
                    title: 'TabBarHomePage',
                    isShowRight: false,
                },

                animName: 'FloatFromBottomAndroid'
            })
        }
    }

    onPress2() {

    }

    onExit() {

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
                    <Text onPress={this.onPress1.bind(this)}>进入TabBar主页</Text>
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