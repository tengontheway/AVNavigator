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

import SecondPageComponent from './SecondPageComponent'

export default  class FirstPageComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 2,
            user: null,
        };
    }

    _pressButton() {
        let _this = this

        const {navigator} = this.props;
        //为什么这里可以取得 props.navigator?请看上文:
        //<Component {...route.params} navigator={navigator} />
        //这里传递了navigator作为props
        if (navigator) {
            navigator.push({
                name: 'SecondPageComponent',
                component: SecondPageComponent,
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
                animationType: Navigator.SceneConfigs.FloatFromRight
            })
        }
    }

    render() {
        if (this.state.user) {
            return (
                <View style={{marginTop: 50}}>
                    <Text>用户信息: { JSON.stringify(this.state.user) }</Text>
                </View>
            );
        } else {
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'blue'
                }}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text>点我跳转并传递id</Text>
                    </TouchableOpacity>
                    <Text style={styles.welcome}>
                        FFirstPageComponent
                    </Text>
                </View>
            )
        }
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