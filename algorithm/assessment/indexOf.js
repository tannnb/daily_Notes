// 如果数组中存在 item，则返回元素在数组中的位置，否则返回 -1
// [ 1, 2, 3, 4 ], 3


// indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置
function indexOf(arr,item) {
    if(Array.prototype.indexOf){
        return arr.indexOf(item)
    }else{
        for(var i=0;i<arr.length;i++){
            if(arr[i] === item){
                return i
            }
        }
    }
    return -1
}

console.log(indexOf([ 1, 2, 3, 4 ],3))