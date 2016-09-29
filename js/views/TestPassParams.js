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

export default class TestPassParams extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id
        }
    }

    _pressButton() {
        if (this.props.getUser) {
            this.props.getUser({
                name: '你妹',
                age: 18
            });
        }

        nav_mgr.pop()
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Text>父界面传入id={ this.state.id }</Text>

                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={this._pressButton.bind(this)}>
                        <Text>点我跳回去并传递参数</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}