/**
 * Created by Qx on 9/28/16.
 */
import React, {Component} from 'react'
import  {
    View,
    PropTypes,
    Modal,
    Text,
    TouchableOpacity
} from 'react-native';
// import { match } from 'react-router';
// import routesConfig from '../routes';

import NavigationBar from './NavigationBar'
import NavViewsMgr from './NavViewsMgr'

export default class PageContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            transparent: true,
            visible: true
        }
    }

    // componentWillMount() {
    //     this.doMatch(this.props);
    // }
    // componentWillReceiveProps(newProps) {
    //     if (newProps.location !== this.props.location) {
    //         this.doMatch(newProps);
    //     }
    // }
    // doMatch(props) {
    //     match({
    //         location,
    //         routes: routesConfig,
    //     }, (err, redirectLocation, renderProps) => {
    //         this.setState({ routerState: renderProps });
    //     });
    // }

    _onPressLeftItem() {
        nav_mgr.pop()
    }

    _onPressRightItem() {

    }

    onPressModal() {
        this.setState({
            visible: false
        })
    }

    componentWillUnmount() {
        if (this.core_compnent) {
            if (this.core_compnent.onExit && typeof this.core_compnent.onExit === 'function') {
                this.core_compnent.onExit()
            }
        }
    }

    render() {
        const {route, navigator} = this.props
        const Component = NavViewsMgr.getView(this.props.screen)
        const navBarHidden = route.navBarHidden === undefined ? true : route.navBarHidden
        const navBarStyle = route.navBarStyle
        let is_modal = route.isModal

        var modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
        };
        return (
            <View style={[{flex: 1}, is_modal ? {backgroundColor: 'rgba(0, 0, 0, 0.5)'} : null]}>
                <View style={{flex: 1}}>
                    {
                        !navBarHidden ?
                            <NavigationBar
                                title='这个是标题'
                                leftImageSource={require('./nav_back.png')}
                                leftStylesEx={{width: 15, height: 15, tintColor: "#3393F2"}}
                                rightItemTitle='下一页'
                                rightTextColor='#3393F2'
                                leftItemFunc={this._onPressLeftItem.bind(this)}
                                rightItemFunc={this._onPressRightItem.bind(this)}
                                {...navBarStyle}
                            />
                            :
                            null
                    }

                    <Component
                        ref={com => {
                            {/*this.core_compnent = com*/}

                            {/*nav_mgr.bindComponent(com, this.props.route)*/}
                        }}
                        {...route.params}
                        style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        navigator={navigator}
                    />
                </View>
            </View>
        )
    }
}