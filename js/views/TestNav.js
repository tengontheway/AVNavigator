/**
 * Created by EvilCode.T on 9/27/16.
 */
import React from 'react';
import {
    View,
    Text,
    Navigator,
    TouchableOpacity
} from 'react-native';

import FirstPageComponent from './MainPage';

export default class TestNav extends React.Component {
    constructor(props) {
        super(props);
    }

    _pressButton() {
        nav_mgr.pop()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>{ this.props.desc ? this.props.desc: '' }</Text>

                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text>点击返回</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}