const change = {
    //将参数=>转成数组 [1,2]
    _args() {
        return Array.prototype.slice.call(arguments)
    },

    //找出出现次数最多的字符和次数
    _findMaxCounts(str) {
        var temp = str.split('').sort().join('');
        var key = '';
        var counts = 0;
        var exp = /(\w)\1+/g;
        temp.replace(exp, function ($0, $1) {
            if (counts < $0.length) {
                counts = $0.length;
                key = $1;
            }
        });
        return {
            key: key,
            counts: counts
        }
    },

    //找出出现所有的所有value值大于2的值
    _getAllKeys(obj) {
        // Object.keys(obj)
        return Object.keys(obj).filter((item) => {
            return obj[item] > 2
        })
    },
    /*[1,2,3,4,5,6,7]*/
    _changeArray(data, size) {
        var data = data.slice();
        var count = parseInt(data.length / size);
        var result = [];
        for (var i = 0; i < count; i++) {
            ret = [];
            for (var j = 0; j < count; j++) {
                result.push(data[i * count + j])
            }
        }
        ret = [];
        if (size * count < arr.length) {
            for (var k = size * count; k < data.length; k++) {
                ret.push(data[size * count + k])
            }
            result.push(ret)
        }
        return result
    },


    // 滚动到距离页面顶部500px的位置 动画时间为200ms   ScrollTop(500, 200);
    ScrollTop(number = 0, time) {
        if (!time) {
            document.body.scrollTop = document.documentElement.scrollTop = number;
            return number;
        }
        const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
        let spacingInex = time / spacingTime; // 计算循环的次数
        let nowTop = document.body.scrollTop || document.documentElement.scrollTop; // 获取当前滚动条位置
        let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
        let scrollTimer = setInterval(() => {
            if (spacingInex > 0) {
                spacingInex--;
                arguments.callee(nowTop += everTop);
            } else {
                clearInterval(scrollTimer); // 清除计时器
            }
        }, spacingTime);
    },

    // 提取身份证 出生日期 - 年龄 - 性别
    getIdCardInfo(identityCard, separator = '/') {
        const Reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!Reg.test(identityCard)) {
            throw Errow('不是一个有效的身份证号码')
        }
        const idCard = identityCard + '';

        // 获取出生年月 性别
        let birthday, gender;
        if (idCard.length === 18) {
            birthday = `${idCard.substr(6, 4)}${separator}${idCard.substr(10, 2)}${separator}${idCard.substr(12, 2)}`
            idCard.charAt(16) % 2 === 0 ? gender = 0 : gender = 1
        } else {
            birthday = `${idCard.substr(6, 2)}${separator}${idCard.substr(8, 2)}${separator}${idCard.substr(10, 2)}`
            idCard.charAt(14) % 2 === 0 ? gender = 0 : gender = 1
        }

        // 获取年龄
        const birthDate = new Date(birthday);
        const newDate = new Date();
        const year = newDate.getFullYear();
        let age = year - birthDate.getFullYear();
        if (newDate < new Date(`${year}${separator}${birthday.substring(5)}`)) {
            age--;
        }
        return {
            age, birthday, gender
        }
    }

};


change._args(1, 2);
change._findMaxCounts("auywwdueaaaaaaaa")
change._getAllKeys({"a": 1, "b": 2, "c": 3, "d": 4})


//sum(x)(y)与sum(x,y)
function sum() {
    var cache;
    if (arguments.length === 1) {
        cache = arguments[0];
        return function (number) {
            return cache + number
        }
    } else {
        return arguments[0] + arguments[1]
    }
}


{
    // 类型判断
    var classType = {};
    var arrType = "Boolean Number String Function Array Date RegExp Object Error"
    arrType.split(' ').forEach(function (item, index) {
        classType['[object ' + item + ']'] = item.toLowerCase()
    })

    function type(obj) {
        if (obj == null) {
            return obj + ''
        }
        return typeof obj === 'object' || typeof obj === 'function' ? classType[Object.prototype.toString.call(obj)] || 'object' : typeof obj
    }

    function isFunction(obj) {
        return type(obj) === 'function'
    }

    function typeCell() {
    }

    isFunction(typeCell)  // true

}

// deepCopy
function cloneObj(origin, target) {
    for (var key in origin) {
        var hasObj = Object.prototype.toString.call(origin[key])
        if (origin.hasOwnProperty(key)) {
            target[key] = origin[key]
        }
        if (typeof origin[key] === 'object' && origin[key] !== null) {
            target[key] = hasObj === '[object Array]' ? [] : {}
            cloneObj(origin[key], target[key])
        }
    }
    return target
}







