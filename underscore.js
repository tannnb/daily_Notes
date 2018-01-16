(function () {

    //缓存this，浏览器的window或者服务端的exports
    var root = this;

    var _ = function (obj) {
        // 如果参数是自己的实例，返回
        if (obj instanceof _) {
            return obj;
        }
        // 安全模式，如果没有new，我们自动new一个实例对象
        if (!(this instanceof _)) {
            return new _(obj)
        }
        /* --------------------
         var Person = function (Obj) {
         if(this instanceof Obj){
         return new Person(Obj)
         }
         this.name = Obj
         }
         var P1 = new Person("myName");
         var p2 = Person("MyName")
         --------------------  */
        this._wrapped = obj;
    };

    // 定义一个空函数
    _.noop = function () {
    };
    /* --------------------
     var Parent = {
     doSomething:function(){},
     doSomethingElse:function(){}
     }
     var Parent = {
     doSomething:_.noop,
     doSomethingElse:_.noop
     }
     使用_.noop 浏览器不用每次都创建多个命名函数了
     --------------------  */

    // 返回一个min到max之间的值(包含min，max)
    _.random = function (min, max) {
        if (max === null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // 时间戳
    _.now = Date.now || function () {
            return new Date().getTime();
        };

    // 给DOM id添加数字累加
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        // 转为字符串格式
        var id = ++idCounter + "";
        return prefix ? prefix + id : id
    }



})();

