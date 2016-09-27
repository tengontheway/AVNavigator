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

import FirstPageComponent from './FirstPageComponent';

const USER_MODELS = {
    1: { name: 'mot', age: 23 },
    2: { name: '晴明大大', age: 25 }
};

export default class SecondPageComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id
        }
    }

    _pressButton() {
        const { navigator } = this.props;

        if(this.props.getUser) {
            let user = USER_MODELS[this.props.id];
            this.props.getUser(user);
        }

        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text>获得的参数: id={ this.state.id }</Text>
                <TouchableOpacity onPress={this._pressButton.bind(this)}>
                    <Text>点我跳回去</Text>
                </TouchableOpacity>
            </View>
        );
    }
}