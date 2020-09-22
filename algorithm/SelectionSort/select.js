const randomArray = require('../TestHelper')

function swap(array, t1, t2) {
    let temp = array[t1];
    array[t1] = array[t2];
    array[t2] = temp;
}


/*
 *   选择排序：从一组数组中，选择最小的值
 *   将arr[i] 与arr[i+1]... 依次进行对比，若小于arr[i],则记录当前j值并赋值minIndex
 * */

function selectionSort(arr) {
    let minIndex
    for (let i = 0; i < arr.length; i++) {

        // 寻找到[i,n) 区间里的最小值，并记录
        minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        swap(arr, i, minIndex)
    }
    return arr
}

console.log(selectionSort(randomArray(0, 10)))


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

let res = [10, 9, 8, 7, 6.4, 5, 4, 3, 21, 1].sort(compare)
console.log(res)


// 数组对象排序
let arrData = [
    { name: "Zlex", age: 24 },
    { name: "Tom", age: 5 }
];

function comparePuls(props) {
    return function(obj1, obj2) {
        obj1 = obj1[props]
        obj2 = obj2[props]
        if (!isNaN(Number(obj1)) && !isNaN(Number(obj2))) {
            obj1 = Number(obj1);
            obj2 = Number(obj2);
        }
        return obj1 > obj2 ? 1 : obj1 < obj2 ? -1 : 0
    }
}

let arrdata = arrData.sort(comparePuls('age'))
console.log(arrdata)