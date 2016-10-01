/**
 * 导航条
 *
    参考微信:
    1.左侧是【返回图片 + 上一页面的标题】或者不显示
    2.中间是标题
    3.右侧是【下一界面的图片 或者 文字】或者不显示
 * Created by EvilCode.T on 9/28/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {
    Image,
    Text,
    View,
    Platform,
    TouchableOpacity,
} from 'react-native';

import styles from './NavigationBarStyle'

// 导航条和状态栏的高度
const STATUS_BAR_HEIGHT = 20
const NAV_BAR_HEIGHT = 44

export default class NavigationBar extends Component {
    static defaultProps = {
        statusBarHeight: STATUS_BAR_HEIGHT,
        navBarHeight: NAV_BAR_HEIGHT,

        title: 'title',
        titleTextColor: '#383838',
        titleViewFunc () {
        },
        barBGColor: '#f8f8f8',
        barOpacity: 1,
        barStyle: 0,
        barBorderBottomColor: '#D4D4D4',
        barBorderBottomWidth: 0.8,
        statusbarShow: true,
        isShowLeft: true,
        leftItemTitle: '',
        leftTextColor: '#383838',
        leftItemFunc () {
        },
        isShowRight: true,
        rightItemTitle: '',
        rightTextColor: '#383838',
        rightItemFunc () {
        },
        //leftImageSource: require('./nav_back.png'),
        leftImageColor: '#383838',
        leftStyles: null,

        titleStylesEx: null,
        leftImageStylesEx: null,
        leftTextStylesEx: null,
        rightImageStyleEx: null,
        rightTextStyleEx: null,
    };
    static propTypes = {
        statusBarHeight: PropTypes.number, // 状态栏高度
        navBarHeight: PropTypes.number,     // 导航栏高度
        title: PropTypes.string,          // nav标题
        titleTextColor: PropTypes.string, // nav标题颜色
        titleView: PropTypes.node,        // nav自定义标题View(节点)
        titleViewFunc: PropTypes.func,    // nav的titleView点击事件
        titleStylesEx: PropTypes.object,  // nav标题样式扩展
        barBGColor: PropTypes.string, // Bar的背景颜色
        barOpacity: PropTypes.number, // Bar的透明度
        barStyle: PropTypes.number,   // Bar的扩展属性,nav样式(暂未使用)
        barBorderBottomColor: PropTypes.string,  // Bar底部线的颜色
        barBorderBottomWidth: PropTypes.number,  // Bar底部线的宽度
        statusbarShow: PropTypes.bool,     // 是否显示状态栏的20高度(默认true)
        isShowLeft: PropTypes.bool,           // 是否显示左边区域
        leftItemTitle: PropTypes.string,   // 左按钮title
        leftImageSource: PropTypes.node,   // 左Item图片(source) *左边有图片的时候，左边文字无效
        leftImageColor: PropTypes.string, // 左Item图片的颜色
        leftImageStylesEx: PropTypes.object,        // 左边样式的补充(在原有样式上添加)
        leftTextStylesEx: PropTypes.object,        // 左边样式的补充(在原有样式上添加)
        leftStyles: PropTypes.object,          // 左边样式的替换
        leftTextColor: PropTypes.string,   // 左按钮标题颜色
        leftItemFunc: PropTypes.func,      // 左Item事件
        isShowRight: PropTypes.bool,         // 是否显示右边的区域
        rightItemTitle: PropTypes.string,  // 右按钮title
        rightImageSource: PropTypes.node,  // 右Item图片(source)
        rightImageStyleEx: PropTypes.object,  // 右边图片样式扩展
        rightTextStyleEx: PropTypes.object,  // 右边图片样式扩展
        rightTextColor: PropTypes.string,  // 右按钮标题颜色
        rightItemFunc: PropTypes.func,     // 右Item事件
    };

    // 能够继承上一个NavigationBar的属性，这个需要开发者手动维护
    static extendsAttr = [
        'statusBarHeight',
        'navBarHeight',
        'titleTextColor',
        'titleStylesEx',

        'barBGColor',
        'barOpacity',
        'barStyle',
        'barBorderBottomColor',
        'barBorderBottomWidth',
        'statusbarShow',

        'leftImageColor',
        'leftImageStylesEx',
        'leftTextStylesEx',
        'leftStyles',
        'leftTextColor',

        'rightImageStyleEx',
        'rightTextStyleEx',
        'rightTextColor',
    ]

    /**
     * 可继承属性的覆盖
     * 如果目标风格中不存在特殊属性, extendsAttr 复制到目标属性中,否则使用当前属性。
     * 为了制作全局的唯一风格,只要一个navigator钟设置了风格,其余的位置都会继承这种风格
     **/
    static extendsWithAttr(old_navbar_styles, new_navbar_styles) {
        // if (old_navbar_styles && new_navbar_styles) {
        //     NavigationBar.extendsAttr.map((key, idx)=>{
        //         new_navbar_styles[key] = new_navbar_styles[key] || old_navbar_styles[key]
        //     })
        // }
    }

    render() {
        // 判断右Item的类型
        var onlyRightIcon = false; // 是否只是图片
        if (this.props.rightImageSource) {
            onlyRightIcon = true;
        }

        // 判断是否显示20状态栏高度
        let showStatusbar = this.props.statusbarShow;
        if (Platform.OS === 'android') {
            // 安卓不显示
            showStatusbar = false;
        }

        console.log("this.props.isShowRight:" + this.props.isShowRight)
        return (
            <View style={styles.nav_barView}>
                <View style={[styles.nav_bar,
                    {
                        backgroundColor: this.props.barBGColor,
                        height: showStatusbar ? this.props.navBarHeight + this.props.statusBarHeight : this.props.navBarHeight,
                        opacity: this.props.barOpacity
                    },
                    showStatusbar ? {paddingTop: this.props.statusBarHeight} : {}, this.props.barStyle]}>

                    {/** 标题 **/}
                    <View style={[styles.nav_titleView, {height: this.props.navBarHeight}, showStatusbar ? {top: this.props.statusBarHeight} : {top: 0} ]}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={[styles.nav_title, {color: this.props.titleTextColor}, this.props.titleStylesEx]}>
                                {this.props.title}
                            </Text>
                        </View>
                    </View>

                    {/** 左边标题 **/}
                    {
                        this.props.isShowLeft ?
                            <TouchableOpacity
                                style={styles.nav_leftItem}
                                onPress={this.props.leftItemFunc}>
                                { // 左侧是图片还是文字
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                        <Image
                                            style={this.props.leftStyles ? this.props.leftStyles : [styles.nav_leftImage, {tintColor: this.props.leftImageColor}, this.props.leftImageStylesEx]}
                                            source={this.props.leftImageSource}/>
                                        <Text
                                            style={this.props.leftStyles ? this.props.leftStyles : [styles.nav_leftTitle, {color: this.props.leftTextColor}, this.props.leftTextStylesEx]}>
                                            {this.props.leftItemTitle}
                                        </Text>
                                    </View>
                                }
                            </TouchableOpacity>
                            :
                            null
                    }

                    {/** 居中占位 **/}
                    {
                        <View style={{flex: 1}}></View>
                    }

                    {/** 右边标题 **/}
                    {
                        this.props.isShowRight ?
                            <View style={styles.nav_ItemView}>
                                { // 右侧item
                                    <TouchableOpacity
                                        style={styles.nav_rightItem}
                                        onPress={this.props.rightItemFunc}>
                                        { // 右侧是图片还是文字
                                            this.props.rightImageSource
                                                ? <Image style={[styles.nav_rightImage, this.props.rightImageStyleEx]}
                                                         source={this.props.rightImageSource}/>
                                                : <Text
                                                style={[styles.nav_rightTitle, this.props.rightTextStyleEx, {color: this.props.rightTextColor}]}>
                                                {this.props.rightItemTitle}
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                }
                            </View>
                            :
                            null
                    }
                </View>

                <View style={{
                    height: this.props.barBorderBottomWidth,
                    backgroundColor: this.props.barBorderBottomColor
                }}></View>
            </View>

        );
    }
}

