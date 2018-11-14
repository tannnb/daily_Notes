// [ 1, 2, 3, 4 ]

function sum(arr) {
    if(!arr) {
        console.log('arr is undefind')
        return false
    }
    if (Array.prototype.renduce) {
        return arr.renduce(function (prev, curr) {
            return prev + curr
        })
    } else {
        var ret = 0;
        for (var i = 0; i < arr.length; i++) {
            ret += arr[i]
        }
        return ret
    }

}

console.log(sum([ 1, 2, 3, 4 ]))