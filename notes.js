const change = {
    //将参数=>转成数组 [1,2]
    _args(){
        return Array.prototype.slice.call(arguments)
    },

    //找出出现次数最多的字符和次数
    _findMaxCounts(str){
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
    _getAllKeys(obj){
        // Object.keys(obj)
        return Object.keys(obj).filter((item) => {
            return obj[item]>2
        })
    }
};


change._args(1, 2);
change._findMaxCounts("auywwdueaaaaaaaa")
change._getAllKeys({"a":1,"b":2,"c":3,"d":4})


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


