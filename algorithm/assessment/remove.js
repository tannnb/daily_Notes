
// 移除数组 arr 中的所有值与 item 相等的元素。不要直接修改数组 arr，结果返回新的数组
// [1, 2, 3, 4, 2], 2


function remove(arr,item) {
    if(!arr) return false
    var result = arr.slice()
    for(var i=0;i<result.length;i++){
        if(result[i] === item){
            result.splice(i,1)
            i--;
        }
    }
    return result;
}

function filter(arr,item){
    return arr.filter(function (currentValue,index,arr) {
        return currentValue !== item
    })
}

console.log( remove([1, 2, 3, 4, 2],2) )
console.log( filter([1, 4, 3, 4, 2],4) )