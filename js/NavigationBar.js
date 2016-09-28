/**
 * 导航条
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
        leftStylesEx: null,
    };
    static propTypes = {
        title: PropTypes.string,          // nav标题
        titleTextColor: PropTypes.string, // nav标题颜色
        titleView: PropTypes.node,        // nav自定义标题View(节点)
        titleViewFunc: PropTypes.func,    // nav的titleView点击事件
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
        leftStylesEx: PropTypes.object,        // 左边样式的补充(在原有样式上添加)
        leftStyles: PropTypes.object,          // 左边样式的替换
        leftTextColor: PropTypes.string,   // 左按钮标题颜色
        leftItemFunc: PropTypes.func,      // 左Item事件
        isShowRight: PropTypes.bool,         // 是否显示右边的区域
        rightItemTitle: PropTypes.string,  // 右按钮title
        rightImageSource: PropTypes.node,  // 右Item图片(source)
        rightTextColor: PropTypes.string,  // 右按钮标题颜色
        rightItemFunc: PropTypes.func,     // 右Item事件
    };

    render() {
        // 判断左Item的类型
        var onlyLeftIcon = false; // 是否只是图片
        if (this.props.leftItemTitle && this.props.leftImageSource) {
            onlyLeftIcon = true;
        } else if (this.props.leftImageSource) {
            onlyLeftIcon = true;
        }

        // 左侧图片title都没有的情况下
        var noneLeft = false;
        if (!(this.props.leftItemTitle.length > 0) && !(this.props.leftImageSource)) {
            noneLeft = true;
        }

        // 判断是否自定义titleView
        var hasTitleView = false;
        if (this.props.title && this.props.titleView) {
            hasTitleView = true;
        } else if (this.props.titleView) {
            hasTitleView = true;
        }

        // 判断右Item的类型
        var onlyRightIcon = false; // 是否只是图片
        if (this.props.rightItemTitle && this.props.rightImageSource) {
            onlyRightIcon = true;
        } else if (this.props.rightImageSource) {
            onlyRightIcon = true;
        }

        // 右侧图片title都没有的情况下
        var noneRight = false;
        if (!(this.props.rightItemTitle.length > 0) && !(this.props.rightImageSource)) {
            noneRight = true;
        }

        // 判断是否显示20状态栏高度
        let showStatusbar = this.props.statusbarShow;
        if (Platform.OS === 'android') {
            // 安卓不显示
            showStatusbar = false;
        }

        return (
            <View style={styles.nav_barView}>
                <View style={[styles.nav_bar,
                    {
                        backgroundColor: this.props.barBGColor,
                        height: showStatusbar ? NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT : NAV_BAR_HEIGHT,
                        opacity: this.props.barOpacity
                    },
                    showStatusbar ? {paddingTop: STATUS_BAR_HEIGHT} : {}, this.props.barStyle]}>

                    {
                        this.props.isShowLeft ?
                            <View style={styles.nav_ItemView}>
                                { // 左侧item
                                    !noneLeft
                                        ? <TouchableOpacity
                                        style={styles.nav_leftItem}
                                        onPress={this.props.leftItemFunc}>
                                        { // 左侧是图片还是文字
                                            onlyLeftIcon ?
                                                <Image
                                                    style={this.props.leftStyles ? this.props.leftStyles : [styles.nav_leftImage, {tintColor: this.props.leftImageColor}, this.props.leftStylesEx]}
                                                    source={this.props.leftImageSource}/>
                                                :
                                                <Text
                                                    style={this.props.leftStyles ? this.props.leftStyles : [styles.nav_leftTitle, {color: this.props.leftTextColor}]}>
                                                    {this.props.leftItemTitle}
                                                </Text>
                                        }
                                    </TouchableOpacity>
                                        : null
                                }
                            </View>
                            :
                            null
                    }

                    {
                        hasTitleView
                            ? <TouchableOpacity style={styles.nav_titleView} onPress={this.props.titleViewFunc}>
                            {this.props.titleView}
                        </TouchableOpacity>
                            : <View style={styles.nav_titleView}>
                            <Text style={[styles.nav_title, {color: this.props.titleTextColor}]}>
                                {this.props.title}
                            </Text>
                        </View>
                    }

                    {
                        this.props.isShowRight ?
                            <View style={styles.nav_ItemView}>
                                { // 右侧item
                                    !noneRight
                                        ? <TouchableOpacity
                                        style={styles.nav_rightItem}
                                        onPress={this.props.rightItemFunc}>
                                        { // 右侧是图片还是文字
                                            onlyRightIcon
                                                ? <Image style={styles.nav_rightImage}
                                                         source={this.props.rightImageSource}/>
                                                : <Text style={[styles.nav_rightTitle, {color: this.props.rightTextColor}]}>
                                                {this.props.rightItemTitle}
                                            </Text>
                                        }
                                    </TouchableOpacity>
                                        : null
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

