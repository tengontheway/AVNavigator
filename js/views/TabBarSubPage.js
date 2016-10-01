/**
 * Created by EvilCode.T on 10/1/16.
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

const { width, height } = Dimensions.get('window');

export default  class TabBarSubPage extends Component {
    constructor(props) {
        super(props)
    }

    onPress1() {
        nav_mgr.pop()
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
                    <Text>这是{this.props.title}子界面</Text>
                    <Text onPress={this.onPress1.bind(this)}>点击返回</Text>
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
