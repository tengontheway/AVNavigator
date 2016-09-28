/**
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

export default  class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state={
            id: 1
        }
    }

    onPressPassParams() {
        let _this = this

        const {navigator} = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                screen: 'views.PassParams',
                //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
                params: {
                    id: this.state.id,
                    //从SecondPageComponent获取user
                    getUser: function (user) {
                        _this.setState({
                            user: user
                        })
                    }
                },
                navBarHidden: false,
                navBarStyle: {
                    title: 'PassParams',
                    isShowRight: false,
                },

                animationType: Navigator.SceneConfigs.FloatFromRight
            })
        }
    }

    onPressNavTest() {
        nav_mgr.push({
            screen: 'views.SubNavPage',
            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
            params: {},
            navBarHidden: false,
            navBarStyle: {
                title: '测试导航栏',
                isShowRight: false,
            },

            animationType: Navigator.SceneConfigs.FloatFromRight
        })
    }

    onPressAnimTest() {
        nav_mgr.push({
            screen: 'views.SubAnimPage',
            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
            params: {},
            navBarHidden: false,
            navBarStyle: {
                title: '测试导航栏',
                isShowRight: false,
            },

            animationType: Navigator.SceneConfigs.FloatFromRight
        })
    }


    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{margin: 10}} onPress={this.onPressPassParams.bind(this)}>测试传递参数</Text>
                <Text style={{margin: 10}} onPress={this.onPressNavTest.bind(this)}>测试导航栏</Text>
                <Text style={{margin: 10}} onPress={this.onPressAnimTest.bind(this)}>测试动画</Text>
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