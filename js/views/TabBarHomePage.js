/**
 * 带有TabBar的HomePage
 * Created by EvilCode.T on 9/27/16.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

//引入tabbar支持包
import TabNavigator from 'react-native-tab-navigator';

const TabNavigatorItem = TabNavigator.Item;

const TAB_NORMAL_1 = require('./img/tab_message.png');
const TAB_NORMAL_2 = require('./img/tab_phone.png');

const TAB_PRESS_1 = require('./img/tab_message_sel.png');
const TAB_PRESS_2 = require('./img/tab_phone_sel.png');

export default class TabBarHomePage extends Component {

    constructor() {
        super();
        this.state = {
            selectedTab: 'Home',
        }
    }

    /**
     tab点击方法
     **/
    onPress(tabName) {
        if (tabName) {
            this.setState(
                {
                    selectedTab: tabName,
                }
            );
        }
    }

    onPressChange(tabName) {
        nav_mgr.push({
            screen: 'views.TabBarSubPage',
            //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
            params: {
                title: tabName
            },
            navBarHidden: true,
        })
    }

    onPressBack() {
        nav_mgr.pop()
    }

    /**
     渲染每项
     **/
    renderTabView(title, tabName, tabContent, isBadge) {
        var tabNomal;
        var tabPress;
        switch (tabName) {
            case 'Home':
                tabNomal = TAB_NORMAL_1;
                tabPress = TAB_PRESS_1;
                break;
            case 'Video':
                tabNomal = TAB_NORMAL_2;
                tabPress = TAB_PRESS_2;
                break;
            default:

        }
        return (
            <TabNavigatorItem
                title={title}
                renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}
                renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}
                selected={this.state.selectedTab === tabName}
                selectedTitleStyle={{color: '#f85959'}}
                onPress={()=>this.onPress(tabName)}
                renderBadge={()=>isBadge ?
                    <View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View> : null}
            >
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text onPress={() => this.onPressChange(tabName)}>
                            {tabContent}
                        </Text>
                    </View>

                    <View style={{ position: 'absolute', left: 20, top: 70}}>
                        <Text onPress={() => this.onPressBack()}>点击返回</Text>
                    </View>
                </View>
            </TabNavigatorItem>
        );
    }

    /**
     自定义tabbar
     **/
    tabBarView() {
        return (
            <TabNavigator
                tabBarStyle={styles.tab}
            >
                {this.renderTabView('头条', 'Home', '头条板块内容(可进入)', true)}
                {this.renderTabView('视频', 'Video', '视频板块内容(可进入)', false)}
            </TabNavigator>
        );
    }


    render() {
        var tabBarView = this.tabBarView();
        return (
            <View style={styles.container}>
                {tabBarView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    tab: {
        height: 100,
        alignItems: 'center',
        backgroundColor: '#f4f5f6',
    },
    tabIcon: {
        width: 50,
        height: 50,
    },
    badgeView: {
        width: 22,
        height: 14,
        backgroundColor: '#f85959',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 3,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 8,
    }
});
