/**
 * 全局公用函数
 *
 * 调用:
    import utils from './Util';
    utils.callFunc(...);
 */

import deepDiffer from 'deepDiffer';

var Utils = {};

Utils.longToByteArray = function(/*long*/long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }

    return byteArray;
};

Utils.byteArrayToLong = function(/*byte[]*/byteArray) {
    var value = 0;
    for ( var i = byteArray.length - 1; i >= 0; i--) {
        value = (value * 256) + byteArray[i];
    }

    return value;
};

// @return bytes []
Utils.stringToByteArray = function(str) {
    var bytes = [];

    for (var i = 0; i < str.length; ++i) {
        bytes.push(str.charCodeAt(i));
    }
    return bytes;
}

// string => uint8array
Utils.stringToUint8Array = function(str) {
    // return new TextEncoder('utf8').encode(str);
    // var string = btoa(unescape(encodeURIComponent(string))),
    //     charList = string.split(''),
    //     uintArray = [];
    // for (var i = 0; i < charList.length; i++) {
    //     uintArray.push(charList[i].charCodeAt(0));
    // }
    // return new Uint8Array(uintArray);
    var arr =  new Uint8Array(Buffer.from(str));
    return arr;
}

// 参考网址:http://ourcodeworld.com/articles/read/164/how-to-convert-an-uint8array-to-string-in-javascript
Utils.uint8ArrayToString = function(uint8array) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    len = uint8array.length;

    i = 0;
    while(i < len) {
        c = uint8array[i++];
        switch(c >> 4)
        {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxxxxxx
            out += String.fromCharCode(c);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            char2 = uint8array[i++];
            out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
            break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = uint8array[i++];
                char3 = uint8array[i++];
                out += String.fromCharCode(((c & 0x0F) << 12) |
                    ((char2 & 0x3F) << 6) |
                    ((char3 & 0x3F) << 0));
                break;
        }
    }

    return out;
}


Utils.isCardID =  function (str) {
    // var iSum = 0;
    // var info = "";
    // if (!/^\d{17}(\d|x)$/i.test(str)) {
    //     return "你输入的身份证长度或格式错误";
    // } 
    // str = str.replace(/x$/i, "a");
    // if (aCity[parseInt(str.substr(0, 2))] == null) return "你的身份证地区非法";
    // sBirthday = str.substr(6, 4) + "-" + Number(str.substr(10, 2)) + "-" + Number(str.substr(12, 2));
    // var d = new Date(sBirthday.replace(/-/g, "/"));
    // if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
    // for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(str.charAt(17 - i), 11);
    // if (iSum % 11 != 1) return "你输入的身份证号非法";
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别

    var reg = /^\d{17}(\d|x)$/;
    return reg.test(str);
}

/**
 * 通过值查找对象
 var test = {
    key1: 42,
    key2: 'foo'
    };

 test.getKeyByValue( 42 );  // returns 'key1'
 * @param object 要查找的对象
 * @param value
 * @returns {string}
 */
Utils.getKeyByValue = function(object, value ) {
    for( var prop in object ) {
        if( object.hasOwnProperty( prop ) ) {
            if( object[ prop ] === value )
                return prop;
        }
    }
}

/**
 * 检测字符串是否是合法的邮箱
 * @param str
 */
Utils.isEmail = function(str) {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(str);
}

/**
 检测是否是正确的电话号码
 (1)必须全为数字;
 (2)必须是11位.(有人说还有10位的手机号,这里先不考虑);
 (3)必须以1开头(有人见过以2开头的手机号吗?)
 (4)第2位是34578中的一个.
 * @param str
 * @returns {boolean}
 */
Utils.isPhone =function (str) {
    var reg = /^1[34578]\d{9}$/;
    return reg.test(str);
}

/**
 * 是否是QQ
 * @param str
 * @returns {boolean}
 */
Utils.isQQ = function(str) {
    var reg = /^[1-9][0-9]{4,10}$/;
    return reg.test(str);
}

/**
 * 检查字符串是否是整数
 * @param {String} 字符串
 * @return {bool} 是否是整数
 */
Utils.isInteger = function(s) {
    var isInteger = /^[0-9]+$/;
    return (isInteger.test(s));
}
/*
 判断字符类型
 */
Utils.CharMode = function(iN) {
    if (iN >= 48 && iN <= 57) //数字
        return 1;
    if (iN >= 65 && iN <= 90) //大写字母
        return 2;
    if (iN >= 97 && iN <= 122) //小写
        return 3;
    else
        return 4; //特殊字符
}

Utils.isCorectAccount = function(str) {
    var reg = /^[a-zA-Z0-9_\s]*$/;
    return reg.test(str);
}
/*
 统计字符类型
 */
Utils.bitTotal = function(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

/**
 * 判断字符串里面是否包含中文
 */

Utils.isCtainChinese = function(str) {
    var reg = /^[\u4e00-\u9fa5]$/;
    return reg.test(reg)
}
/*
 返回密码的强度级别
 */
Utils.checkStrong = function(sPW) {
    if (sPW.length <= 4)
        return 0; //密码太短
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //测试每一个字符的类别并统计一共有多少种模式.
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

/**
 * 递归打印对象 优化了Object Array function 空字符串 null
 * @param o
 * @param lvl
 * @returns {string}
 */
Utils.recursiveToString = function(o, lvl){
    var space = '';
    for (let i = 0; i < lvl; ++i) {
        space += '\t';
    }

    var s = "";
    for (var property in o) {
        var val = o[property];
        if (typeof(val) === 'object') {
            var flag_start = '{';
            var flag_end = '}';
            if (val == null) {
                val = 'null';
                s = s + "\r\n" + space + property  + ": "  + val + space;
                continue;
            }
            else if (val.constructor == Date) {
                s = s + "\r\n" + space + property  + ": "  + gfuncs.formatdate ('yyyy年mm月dd日', val); + " Local:" + val.toLocaleString()+ space;
                continue
            }
            else if (val.constructor == Object)
            {
                flag_start = "{";
                flag_end = "}";

            } else if (val.constructor == Array) {
                flag_start = '[';
                flag_end = ']';
            }

            s = s + "\r\n" + space + property  + ": " + flag_start + this.recursiveToString(val, lvl+1) + "\r\n" + space + flag_end;
        } else {
            if (typeof val === 'function') {
                let str = val.toString();
                let idx = str.indexOf('{');
                str = str.substring(0, idx);

                val =  str + " { ... }"
            } else if (typeof val === 'string') {
                let tmp = val;
                if (tmp.trim() === '') {
                    val = "'" + tmp + "'";
                }
            }
            s = s + "\r\n" + space + property +": " + val ;
        }
    }
    return s;
}

Utils.toString = function(data, alias="data") {
    var t = {};
    t[alias] = data;
    return Utils.recursiveToString(t, 0);
}


/**
    trim() method for String

    var s = "   __haha sss  fff___   \t   ".trim();
    alert("aaa" + s + "bbb");
 * */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};

/**
 * Unix时间戳转JS的Date
 * @param timestamp unix时间戳 eg.
 * @returns {Date}
 */
Utils.getDate = function getDate(timestamp) {
    return new Date(parseInt(timestamp) * 1000)
}

/**
 * 时间戳转字符串
 */

Utils.getDateStr = function (stamp) {
    var newDate = utils.getDate(stamp);
    var dateStr = newDate.toDateString();
    return dateStr;
}




Utils.getTimestamp = function getDate(date) {
    return Date.parse(date)/1000;
}


/**
 * 克隆JS对象(深度拷贝)
 * @param obj 要克隆的对象
 * @returns {Clone}
 */
Utils.clone = function clone(obj) {
    var o;
    if (typeof obj == "object") {
        if (obj === null) {
            o = null;
        } else {
            if (obj instanceof Array) {
                o = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    o.push(clone(obj[i]));
                }
            } else {
                o = {};
                for (var j in obj) {
                    o[j] = clone(obj[j]);
                }
            }
        }
    } else {
        o = obj;
    }
    return o;
}

/**
 * 判断两个对象是否相等(深度对比,非指针对比)
 * @param a
 * @param b
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/differ/deepDiffer.js
 */
Utils.isEqual = function (a, b) {
    return !deepDiffer(a, b);
}



export default Utils;


