const randomArray = require('../TestHelper')
let randomArr = randomArray(10, 20)


/* 插入排序
 * 第一个默认已经排好，从下标为1开始，依次与前面进行对比，如arr[j-1]<arr[j] 刚好为排序顺序
 * */
function insertionSort(arr) {

    for (var i = 1; i < arr.length; i++) {
        for (var j = i; j > 0; j--) {
            if (arr[j] < arr[j - 1]) {
                var temp = arr[j]
                arr[j] = arr[j - 1]
                arr[j - 1] = temp
            }
        }
    }
    return arr
}

console.log(insertionSort(randomArr))


/*
for (var i = 1; i < arr.length; i++) {
    // J进入循环必须满足2个条件，j>0且要比前一位元素要小
    for (var j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
        var temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
    }
}*/