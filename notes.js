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
            return obj[item] > 2
        })
    },
    /*[1,2,3,4,5,6,7]*/
    _changeArray(data,size){
        var data = data.slice();
        var count = parseInt(data.length/size);
        var result = [];
        for(var i=0;i<count;i++){
            ret = [];
            for(var j = 0;j<count;j++){
                result.push(data[i*count+j])
            }
        }
        ret = [];
        if(size*count<arr.length){
            for(var k=size*count;k<data.length;k++){
                ret.push(data[size*count+k])
            }
            result.push(ret)
        }
        return result
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


{
    var classType = {};
    var arrType = "Boolean Number String Function Array Date RegExp Object Error"
    arrType.split(',').forEach(function(item,index){
        classType['[object '+ item +']'] = item.toLowerCase()
    })
    
   function type(obj){
        if(obj == null){
            return obj + ''
        }
       return typeof obj === 'object' || typeof obj === 'function'? classType[Object.prototype.toString.call(obj)] || 'object': typeof obj
   }
    
   function isFunction(obj){
        return type(obj) === 'function'
   }
    
   function typeCell(){}
    isFunction(typeCell)  // true
    
}








