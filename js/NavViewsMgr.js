/**
 * 所有注册的界面
 * Created by EvilCode.T on 9/28/16.
 */
export default class NavViewsMgr
{
    static register(view_name, view) {
        if (NavViewsMgr.views[view_name]) {
            console.warn(`View ${view_name} already exist!`)
            return
        }

        NavViewsMgr.views[view_name] = view
    }

    static getView(view_name) {
        if (!NavViewsMgr.views[view_name]) {
            console.error(`View ${view_name} not registered!`)
            return
        }

        return  NavViewsMgr.views[view_name]
    }
}

NavViewsMgr.views = {}
