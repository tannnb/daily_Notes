function swap(array, t1, t2) {
    let temp = array[t1];
    array[t1] = array[t2];
    array[t2] = temp;
}


/*
 *   选择排序：从一组数组中，选择最小的值
 *   // 将arr[i] 与arr[i+1]... 依次进行对比，若小于arr[i],则记录当前j值并赋值minIndex
 * */

function selectionSort(arr) {

    for (var i = 0; i < arr.length; i++) {

        // 寻找到[i,n) 区间里的最小值，并记录
        var minIndex = i;

        for (var j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        swap(arr, i, minIndex)
    }
    return arr
}

var ret1 = selectionSort([10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
var ret2 = selectionSort([10, 9, 8, 7, 6.4, 5, 4, 3, 2, 1])
var ret3 = selectionSort(['A', 'G', 'Z', 'C', 'H'])
console.log(ret1)
console.log(ret2)
console.log(ret3)


// 利用比较函数
function compare(n, m) {
    if (n > m) {
        return 1
    } else if (n < m) {
        return -1
    } else {
        return 0
    }
}
var res = [10, 9, 8, 7, 6.4, 5, 4, 3, 21, 1].sort(compare)
console.log(res)


// 数组对象排序
var arrData = [
    {name: "张三", age: 24},
    {name: "李四", age: 22}
];

function comparePuls(props) {
    return function (obj1, obj2) {
        var obj1 = obj1[props]
        var obj2 = obj2[props]
        return obj1 > obj2 ? 1 : obj1 < obj2 ? -1 : 0
        /*if(obj1>obj2){
         return 1
         }else if(obj1<obj2){
         return -1
         }else{
         return 0
         }*/
    }
}
var arrdata = arrData.sort(comparePuls('age'))
console.log(arrdata)