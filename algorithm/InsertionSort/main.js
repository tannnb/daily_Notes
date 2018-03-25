const randormArray = require('../TestHelper')


var randomArray = randormArray(10, 20, 80)

// 插入排序
/*
 * 第一个默认已经排好，从下标为1开始，依次与前面进行对比，如arr[j-1]<arr[j] 刚好为排序顺序，直接breack当次
 * */
function insertionSort(arr) {

    for (var i = 1; i < arr.length; i++) {
        for (var j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                var temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            } else {
                break
            }
        }
    }
    return arr
}

insertionSort(randomArray)  //[ 37, 43, 45, 47, 49, 50, 52, 64, 68, 78 ]


for (var i = 1; i < arr.length; i++) {
    // J进入循环必须满足2个条件，j>0且要比前一位元素要小
    for (var j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
        var temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
    }
}