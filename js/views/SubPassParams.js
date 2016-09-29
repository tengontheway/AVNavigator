/**
 * Created by Qx on 9/27/16.
 */
import React from 'react';
import {
    View,
    Text,
    Navigator,
    TouchableOpacity
} from 'react-native';

import FirstPageComponent from './MainPage';

export default class SubPassParams extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 999,
            user: null
        }
    }

    _pressNext() {
        _this = this

        nav_mgr.push({
            screen: 'views.TestPassParams',          // 注册的界面名
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
            navBarHidden: false,                // 导航栏隐藏(默认显示)
            customNavBar: null,                 // 完全自己定制导航栏(navBarHidden!=false时有效)
            navBarStyle: {                      // NavBar的参数,具体参考NavigationBar的参数
                title: 'id' + this.state.id,
                isShowLeft: true,
                isShowRight: false,
            }
        })
    }

    render() {
        let info = this.state.user ? `小道消息: ${this.state.user.name}年芳${this.state.user.age}...` : '没有用户信息'
        return (
            <View style={{flex: 1}}>
                <Text>{info}</Text>

                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={this._pressNext.bind(this)}>
                        <Text>传递参数到子界面</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}