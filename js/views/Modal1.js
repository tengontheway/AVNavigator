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


export default  class Modal1 extends Component {
    constructor(props) {
        super(props)
    }

    onPress1() {
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