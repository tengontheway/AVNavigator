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
    ScrollView
} from 'react-native';


export default  class SubNavPage extends Component {
    constructor(props) {
        super(props)

        /**
         *
         statusbarShow= {true}
         barBGColor='rgba(0, 255, 0, 0.5)'
         barOpacity={0.5}

         title='这个是标题'
         titleStylesEx={{fontSize: 22, color: 'red', fontWeight: 'bold'}}

         leftImageSource={require('./nav_back.png')}
         leftItemTitle={last_title}
         leftTextColor='#3393F2'
         leftImageStylesEx={{width: 15, height: 15, tintColor: "#3393F2", marginLeft: 0}}
         leftTextStylesEx={{fontSize: 15}}

         rightItemTitle='下一页'
         rightTextColor='#3393F2'
         rightImageSource={require('./views/img/tab_phone_sel.png')}
         rightImageStyleEx={{width: 22, height: 22, tintColor: "#3393F2"}}
         * @type {*[]}
         */

        this.data = [
            {
                titleName: '不显示NavBar',
                route: {
                    screen: 'views.TestNav',
                    navBarHidden: true,
                }
            },

            {
                titleName: '不显示左边',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title: '不显示左边',
                        isShowLeft: false,
                    },
                }
            },
            {
                titleName: '不显示右边',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title: '不显示右边',
                        isShowRight: false,
                    },
                }
            },

            {
                titleName: '左右都不显示',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title: '左右都不显示',
                        isShowLeft: false,
                        isShowRight: false,
                    },
                }
            },

            {
                titleName: '定制背景色',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title: '定制背景色',
                        isShowLeft: false,
                        isShowRight: false,

                        barBGColor: 'rgba(255, 0, 255, 1)'
                    },
                }
            },

            {
                titleName: '隐藏状态栏',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title: '隐藏状态栏',
                        isShowLeft: false,
                        isShowRight: false,

                        statusbarShow: false,
                    },
                }
            },

            {
                titleName: '显示状态栏',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title: '显示状态栏',
                        isShowLeft: false,
                        isShowRight: false,

                        statusbarShow: true
                    },
                }
            },


            {
                titleName: '定制标题样式',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'定制标题样式',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        isShowLeft: false,
                        isShowRight: false,
                    },
                }
            },

            {
                titleName: '定制左边信息',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'定制左边信息',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        leftTextColor: '#3393F2',
                        leftImageStylesEx: {width: 15, height: 15, tintColor: "#3393F2", marginLeft: 0},
                        leftTextStylesEx: {fontSize: 15},

                        isShowRight: false,
                    },
                }
            },

            {
                titleName: '定制右边图片',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'定制右边图片',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        rightImageSource: require('./img/tab_phone_sel.png'),
                        rightImageStyleEx: {width: 22, height: 22, tintColor: "#3393F2"},

                        isShowLeft: false,
                    },
                }
            },

            {
                titleName: '定制右边文本',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'定制右边文本',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        rightItemTitle: '下一页',
                        rightTextColor: '#3393F2',
                        rightImageSource: null,

                        isShowLeft: false,
                    },
                }
            },

            {
                titleName: '左边点击事件',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'左边点击事件',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        leftTextColor: '#3393F2',
                        leftImageStylesEx: {width: 15, height: 15, tintColor: "#3393F2", marginLeft: 0},
                        leftTextStylesEx: {fontSize: 15},
                        onPressLeft: ()=>{
                            alert("Click left")
                            // nav_mgr.pop()
                        },

                        isShowRight: false,
                    },
                }
            },

            {
                titleName: '右边点击事件',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'右边点击事件',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        rightItemTitle: '下一页',
                        rightTextColor: '#3393F2',
                        rightImageSource: null,
                        onPressRight: ()=>{
                            alert("Click right")
                        },

                        isShowLeft: false,
                    },
                }
            },

            {
                titleName: '完全定制版',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'完全定制版',
                        titleStylesEx: {fontSize: 22, color: 'green', fontWeight: 'bold'},

                        leftTextColor: '#3393F2',
                        leftImageStylesEx: {width: 15, height: 15, tintColor: "#3393F2", marginLeft: 0},
                        leftTextStylesEx: {fontSize: 15},
                        onPressLeft: ()=>{
                            // alert("Click left")
                            nav_mgr.pop()
                        },

                        rightItemTitle: '下一页',
                        rightTextColor: '#3393F2',
                        rightImageSource: null,
                        onPressRight: ()=>{
                            alert("Click right")
                        },
                    },
                }
            },

            {
                titleName: '完全继承文字版',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'完全继承文字版',
                        onPressLeft: ()=>{
                            // alert("Click left")
                            nav_mgr.pop()
                        },

                        rightItemTitle: '下一页',
                        rightImageSource: null,
                        onPressRight: ()=>{
                            alert("Click right")
                        },
                    },
                }
            },

            {
                titleName: '完全继承文字版',
                route: {
                    screen: 'views.TestNav',

                    navBarHidden: false,
                    navBarStyle: {
                        title:'完全继承文字版',
                        onPressLeft: ()=>{
                            // alert("Click left")
                            nav_mgr.pop()
                        },

                        rightImageSource: require('./img/tab_phone_sel.png'),
                        onPressRight: ()=>{
                            alert("Click right")
                        },
                    },
                }
            },

        ]
    }

    onPress1(idx) {
        let route = this.data[idx].route
        nav_mgr.push(route)
    }

    onPress2() {

    }

    onExit() {

    }

    render() {
        let children = this.data.map((data, idx)=>{
            return <Text key={idx} style={{margin: 3}} onPress={this.onPress1.bind(this, idx)}>{data.titleName}</Text>
        })

        return (
            <ScrollView>
                <View style={{flex: 1, marginTop: 10}}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {
                            children
                        }
                    </View>
                </View>
            </ScrollView>
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