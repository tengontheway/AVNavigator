/**
 *

 * Created by EvilCode.T on 10/2/16.
 */

import NavAnimationMgr from './NavAnimationMgr'
import NavigationBar from './NavigationBar'
import NavMgr from './NavMgr'
import NavViewsMgr from './NavViewsMgr'
import PageContainer from './PageContainer'

if (!global.nav_mgr)
    global.nav_mgr = new NavMgr()

PageContainer.autoMemoryNavigationBarStyles = true

// 只有NavMgr是对外的
export {
    NavAnimationMgr,
    NavigationBar,
    NavMgr,
    NavViewsMgr,
    PageContainer
}

