/**
 * Created by EvilCode.T on 10/2/16.
 */
import * as views from '../views';
import {NavViewsMgr} from '../navbar'

/**
 * 注册所有组件
 * @param store
 * @param Provider
 */
export function registerScreens(store, Provider) {
    // 内部自动注册,类似于 NavViewMgr.register("views.LoginView", views.LoginView)
    for (var key in views) {
        let name = `views.${key}`
        let component = views[key]

        NavViewsMgr.register(name, component)
    }
}
