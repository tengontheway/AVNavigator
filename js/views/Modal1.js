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

const { width, height } = Dimensions.get('window');

export default  class Modal1 extends Component {
    constructor(props) {
        super(props)
    }

    onPress1() {
        nav_mgr.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={styles.text} onPress={this.onPress1.bind(this)}>关闭对话框</Text>
                </View>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        right: 0,
        top: 0,
        width: width/2,
        height: height,
        backgroundColor: '#eee',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        backgroundColor: 'green'
    },
});