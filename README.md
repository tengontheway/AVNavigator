# AVNavigator
封装的一个以RN自带的Navigator为根节点的界面管理器，所有的界面跳转都通过RN自带的Navigator来处理，支持iOS && android。

# 功能
- 所有界面任意的跳转，自带的Navigator非常的灵活
- 封装了带有记忆功能的NavationBar，界面定制更加灵活
- 封装了基于Navigator的模态对话框, 弹出半透明的模态对话框易如反掌
- 添加了Naviator中混杂着TabBar的处理情况
- 所有的功能的基本都附带着Demo

# 问题
- 如何根据不同界面来来自定义navigatorBar?,全局使用定义好的navigatorbar，但部分界面会根据情况，调整这个bar，比如背景色或多加按钮等？
 答:最简单的办法就是不使用navigationBar，而把导航作为目标页面的一部分去做
- 模态对话框
- TabBar的显示、隐藏、定制

# 封装需求:
1.封装所有动画类型到AT,不希望每个界面都引用Navigator
2.封装所有界面控件注册为字符串形式，通过字符串调用界面，当我们需要跳转页面的时候，也只需要声明跳到页面的地址，而无需引入相关组件,避免界面之间的繁琐引用
3.路由的可序列化。这意味着你可以把路由状态保存到持久存储中，在下一次打开应用的时候恢复这个状态。
4.更易于进行页面统计（如停留统计等等）两个用户在访问地址相同的页面（同一篇文章、同一个用户的信息等等），我们的后台数据统计就能依据地址来识别哪个页面的访问量多、停留时间长等等。

# 思路参考
[React Native中应用react-router处理路由](http://bbs.reactnative.cn/topic/495/react-native%E4%B8%AD%E5%BA%94%E7%94%A8react-router%E5%A4%84%E7%90%86%E8%B7%AF%E7%94%B1)

# TODO
- 导航栏：标题时刻居中
- 导航栏：导航栏左侧的文字(上一个标题的)
- 模态对话框
- TabBar的显示隐藏



# 使用技巧

## 1.使用Navigator做到任意位置都可以跳转使用
将Navigator转为全局的
```
<Navigator ref={nav => global.nav = nav} ... />
```
参考: [新手理解Navigator的教程](http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B)

## 2.Navigator在应用中是一个还是多个？
Navigator是覆盖整个页面的大容器，这个容器只用在根页面创建一次，然后每次一整页一整页的push

## 3.Navigator定制每个界面的入场动画
```
configureScene(route) {
    return route.animationType || Navigator.SceneConfigs.FloatFromRight;
}
```


# 参数列表模板
```
const {navigator} = this.props;
//为什么这里可以取得 props.navigator?请看上文:
//<Component {...route.params} navigator={navigator} />
//这里传递了navigator作为props
if (navigator) {
    navigator.push({
        screen: 'views.LoginView',          // 注册的界面名
        isModal: true,                      // 是否是模态对话框(半透效果)
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
        navBarHidden: false,                // 导航栏隐藏(默认显示)
        customNavBar: null,                 // 完全自己定制导航栏(navBarHidden!=false时有效)
        navBarStyle: {                      // NavBar的参数,具体参考NavigationBar的参数
            title: '首页',
            isShowLeft: false,
            isShowRight: false,
        }
    })
}
```

# 导航栏动画跳转
调用规则: animType > animName > 默认

- 方法1：使用animName(推荐)
```
{
  ...
  animName: 'FloatFromRight',
  ...
}
```

- 方法2：使用animType
```
{
  ...
  animType: Navigator.SceneConfigs.FloatFromRight,
  ...
}
```

通过参数 ```animName: 'FloatFromRight'```来实现，避免了各个界面对于```Navigator```的引用
内部会将动画名字转化为动画类型```animType: Navigator.SceneConfigs.FloatFromRight```传递给Navigator调用

类型参考: ```NavAnimationMgr.js```中
```
Navigator.SceneConfigs.PushFromRight (默认)
Navigator.SceneConfigs.FloatFromRight
Navigator.SceneConfigs.FloatFromLeft
Navigator.SceneConfigs.FloatFromBottom
Navigator.SceneConfigs.FloatFromBottomAndroid
Navigator.SceneConfigs.FadeAndroid
Navigator.SceneConfigs.HorizontalSwipeJump
Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
Navigator.SceneConfigs.VerticalUpSwipeJump
Navigator.SceneConfigs.VerticalDownSwipeJump
```

# 传递信息
- 传递给子窗口 ```this.props...```
- 传递给父窗口
每个注册界面，在退出的时候，可以在componentWillUnmount接收到退出消息，或者实现onExit函数，会自动调用
可以在这两个函数中，将需要的数据传递给父窗口

# 模态对话框
- 实现原理:不适用Modal,而是直接适用Navigator
在从根视图开始就使用RN编写的应用中，你应该使用Navigator来代替Modal。通过一个最顶层的Navigator，你可以通过configureScene属性更加方便的控制如何将模态场景覆盖显示在你App其余的部分上。
参考链接:http://reactnative.cn/docs/0.31/modal.html#content

- 问题: 从一个SceneA => Modal SceneB, 适用navigator默认的是播放完动画后,隐藏SceneA,显示SceneB,无法看到底层界面
这里采用了比较巧的做法,适用钩子函数,覆盖navigator下原有的隐藏上一界面的逻辑处理

```
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCENE_DISABLED_NATIVE_PROPS = {
    pointerEvents: 'none',
    style: {
        top: SCREEN_HEIGHT,
        bottom: -SCREEN_HEIGHT,
        opacity: 0,
    },
};

// Hook navigator method
function hookedDisableScene(sceneIndex) {
    const sceneConstructor = this.refs[`scene_${sceneIndex}`];
    const nextRoute = this.state.routeStack[sceneIndex + 1];

    if (nextRoute && nextRoute.isModal) {
        sceneConstructor.setNativeProps({
            pointerEvents: 'none',
        });
    } else {
        sceneConstructor.setNativeProps(SCENE_DISABLED_NATIVE_PROPS);
    }
}

/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign  */
export function hookNavigator(navigator) {
    if (!navigator._hookedForDialog) {
        navigator._hookedForDialog = true;
        navigator._disableScene = hookedDisableScene.bind(navigator);
    }
}
```
参考链接:http://git.oschina.net/hzerica/react-native-starter-kit/blob/master/src/pages/dialogs/Dialog.js?dir=0&filepath=src%2Fpages%2Fdialogs%2FDialog.js&oid=e46833df4290d6219d9730959587e079b316a588&sha=4432ba6f8c531fb003ef80b81663820b5b588988

# TabBar的做法定制
使用了第三方插件react-native-tab-navigator,TabBar并没有封装到所有根Navigator之中，只是在需要的HomePage(带TabBar的主页而非初始页面)中添加TabBar，而不是在所有页面中添加一个TabBar通过参数来控制显示隐藏。


# 导航栏定制
对导航栏`NavigationBar`采用了全局样式的保存，就是任意位置调用了NavigationBar的样式(首先是可见的前提下)，应用中会有一份记录gNavBarStyle，以后的NavBar样式是在之前的基础之上，增量覆盖并保存。
