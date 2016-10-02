/**
 * 管理所有的Navigator的动画, 这里需要和
 * ./node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
 * 下的动画保持一致，注册成字符串形式，避免所有界面都需要引用Navigator的动画
 * Created by EvilCode.T on 9/28/16.
 */

import React, {
    Navigator,
} from 'react-native';

/**
 * 动画管理器
 */
export default class NavAnimationMgr
{
    constructor() {
        this.anims = {}

        this.anims['PushFromRight'] = Navigator.SceneConfigs.PushFromRight
        this.anims['FloatFromRight'] = Navigator.SceneConfigs.FloatFromRight
        this.anims['FloatFromLeft'] = Navigator.SceneConfigs.FloatFromLeft
        this.anims['FloatFromBottom'] = Navigator.SceneConfigs.FloatFromBottom
        this.anims['FloatFromBottomAndroid'] = Navigator.SceneConfigs.FloatFromBottomAndroid
        this.anims['FadeAndroid'] = Navigator.SceneConfigs.FadeAndroid
        this.anims['HorizontalSwipeJump'] = Navigator.SceneConfigs.HorizontalSwipeJump
        this.anims['HorizontalSwipeJumpFromRight'] = Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
        this.anims['VerticalUpSwipeJump'] = Navigator.SceneConfigs.VerticalUpSwipeJump
        this.anims['VerticalDownSwipeJump'] = Navigator.SceneConfigs.VerticalDownSwipeJump
    }

    /**
     * 根据动画名字，返回Navigator下的动画
     * @param anim_name
     * @returns {*}
     */
    getAnim(anim_name) {
        if (!anim_name) {
            return Navigator.SceneConfigs.PushFromRight
        }

        let anim = this.anims[anim_name]
        if (!anim) {
            console.logError("Anim name is not exist!:" + anim_name)
            return null
        }

        return anim
    }

    getAnimList() {
        return this.anims
    }
}
