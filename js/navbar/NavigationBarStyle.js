/**
 * NavigationBarStyle 导航条的样式
 * Created by EvilCode.T on 9/28/16.
 */
'use strict';

import {
    StyleSheet,
    Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default  StyleSheet.create({
    // navBar
    nav_barView:{
        justifyContent: 'center',
    },
    nav_bar: {
        //flex:1,
        flex: 0,
        flexDirection:'row',
        justifyContent: 'center',
    },

    // 标题纯title
    nav_title: {
        fontSize:17,
        fontWeight: 'bold'
    },

    // titleView
    nav_titleView: {
        // flex: 1,
        position: 'absolute',
        left: 0,
        width: width,
        // backgroundColor: 'red'
    },

    nav_ItemView:{
        width:80,
        justifyContent: 'center',
    },

    // 左Item
    nav_leftItem: {
        flex: 0,
        marginLeft:8,
        // flex:1,
        flexDirection: 'row',
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignSelf: 'flex-start',
        //backgroundColor:'#f00',
    },

    // 左Item为title
    nav_leftTitle: {
        marginRight:0,
        marginLeft:0,
        fontSize: 14,
    },

    // 左图片
    nav_leftImage: {
        marginLeft:10,
        marginRight: 5,
        resizeMode:'contain',
    },

    // 右Item
    nav_rightItem: {
        marginRight:8,
        flex:1,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        //backgroundColor:'#3393F2',
    },

    // 右Item为title
    nav_rightTitle: {
        marginRight:5,
        marginLeft:5,
        fontSize: 14,
    },

    // 右图片
    nav_rightImage:{
        margin:10,
        resizeMode:'contain',
        //backgroundColor:'#f00',
    },
    //resizeMode:'contain',
});

