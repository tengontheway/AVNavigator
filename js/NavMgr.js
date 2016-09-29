/**

 1.必须在全局Navigator中注册一个global._global_nav，所有的NavMgr的操作都基于这个对象
    <Navigator ref={nav => global._global_nav = nav} />

 * Created by EvilCode.Teng on 9/28/16.
 */

/**
 参考:

 this.props.navigator.push({
        screen: 'views.RegAccount', // unique ID registered with Navigation.registerScreen
        title: '注册', // navigation bar title of the pushed screen (optional)
        //titleImage: require('../../img/my_image.png'), //navigation bar title image instead of the title text of the pushed screen (optional)
        passProps: {
            user: this.props.login.account,
            pwd: this.props.login.pwd
        }, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the push have transition animation or does it happen immediately (optional)
        backButtonTitle: '', // override the back button title (optional)
        backButtonHidden: false, // hide the back button altogether (optional)
        // navigatorStyle: { navBarHidden: false, navBarBackgroundColor: '#5786bb', navBarTextColor: 'white' }, // override the navigator style for the tab screen, see "Styling the navigator" below (optional),
        navigatorButtons: {}, // override the nav buttons for the pushed screen (optional)

        navigatorStyle : {

            navBarTextColor: 'white', // change the text color of the title (remembered across pushes)
            navBarBackgroundColor: '#5786bb', // change the background color of the nav bar (remembered across pushes)
            navBarButtonColor: 'white', // change the button colors of the nav bar (eg. the back button) (remembered across pushes)
            navBarHidden: false, // make the nav bar hidden
            navBarHideOnScroll: false, // make the nav bar hidden only after the user starts to scroll
            navBarTranslucent: false, // make the nav bar semi-translucent, works best with drawUnderNavBar:true
            navBarTransparent: false, // make the nav bar transparent, works best with drawUnderNavBar:true
            navBarNoBorder: false, // hide the navigation bar bottom border (hair line). Default false
            drawUnderNavBar: false, // draw the screen content under the nav bar, works best with navBarTranslucent:true
            drawUnderTabBar: false, // draw the screen content under the tab bar (the tab bar is always translucent)
            statusBarBlur: false, // blur the area under the status bar, works best with navBarHidden:true
            navBarBlur: false, // blur the entire nav bar, works best with drawUnderNavBar:true
            tabBarHidden: false, // make the screen content hide the tab bar (remembered across pushes)
            statusBarHideWithNavBar: false, // hide the status bar if the nav bar is also hidden, useful for navBarHidden:true
            statusBarHidden: false, // make the status bar hidden regardless of nav bar state
            statusBarTextColorScheme: 'dark'

        }

    });
 */


/**
 getCurrentRoutes() - 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
 jumpBack() - 跳回之前的路由，当然前提是保留现在的，还可以再跳回来，会给你保留原样。
 jumpForward() - 上一个方法不是调到之前的路由了么，用这个跳回来就好了。
 jumpTo(route) - 跳转到已有的场景并且不卸载。
 push(route) - 跳转到新的场景，并且将场景入栈，你可以稍后跳转过去
 pop() - 跳转回去并且卸载掉当前场景
 replace(route) - 用一个新的路由替换掉当前场景
 replaceAtIndex(route, index) - 替换掉指定序列的路由场景
 replacePrevious(route) - 替换掉之前的场景
 resetTo(route) - 跳转到新的场景，并且重置整个路由栈
 immediatelyResetRouteStack(routeStack) - 用新的路由数组来重置路由栈
 popToRoute(route) - pop到路由指定的场景，在整个路由栈中，处于指定场景之后的场景将会被卸载。
 popToTop() - pop到栈中的第一个场景，卸载掉所有的其他场景。
 */

/**
 route = {
    name: 'SecondPageComponent',
    component: SecondPageComponent,
    //这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数...
    params: {
        id: this.state.id,
        //从SecondPageComponent获取user
        getUser: function (user) {
            _this.setState({
                user: user
            })
        }
    },
    animationType: Navigator.SceneConfigs.FloatFromRight
 }
 */


import NavAnimationMgr from './NavAnimationMgr'
import NavViewsMgr from './NavViewsMgr'

/**
 * 全局的Navigator管理器
 */
class NavMgr
{
    constructor() {
        this.nav_anim_mgr = new NavAnimationMgr()

        console.log("getAnim:" + this.nav_anim_mgr.getAnimList())
    }

    /**
     * 获得全局的唯一navigator
     * @returns {*}
     */
    getNavigator() {
        if (!global._global_nav) {
            console.warn("global._global_nav is not registered!")
            return
        }
        return global._global_nav
    }

    /**
     * 跳转一个新场景
     * @param route
     */
    push(route) {
        // 强制填充一个UID
        let id = NavMgr._glboal_idx++
        route._gid = id

        NavMgr.last_scene_id = NavMgr.cur_scene_id
        NavMgr.cur_scene_id = id

        let nav = this.getNavigator()
        nav.push(route)
    }

    /**
     * 跳转回去并且卸载掉当前场景
     */
     pop() {
        //  alert(111)
        // let scene = NavMgr._scenes[NavMgr.cur_scene_id]
        // if (!scene) {
        //     console.error(`Pop scene error! CurSceneID ${NavMgr.cur_scene_id} lastSceneID ${NavMgr.last_scene_id}`)
        //     return
        // }
        // if (scene.compnent) {
        //     let com = scene.compnent
        //     if (com.onExit && typeof com.onExit === 'function') {
        //         com.onExit()
        //     }
        // }

        let nav = this.getNavigator()
        nav.pop()
    }

    getAnimMgr() { return this.nav_anim_mgr }

    /**
     * 绑定核心组件
     * @param component
     * @param route
     */
    bindComponent(component, route) {
        // let scene = NavMgr._scenes[route._gid]
        // if (!scene) {
        //     console.error("Bind component error! gid is not exist!" + route._gid)
        //     return
        // }
        //
        // scene.route = route
        // scene.compnent = component
    }
}

NavMgr._glboal_idx = 0
NavMgr.cur_scene_id = 0
NavMgr.last_scene_id = -1
NavMgr._scenes = []     // { 0: {route, compnent}, ...}

export default NavMgr