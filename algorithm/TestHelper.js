// 生成n个元素的随机数组，每个元素的随机范围为[rangeL，rangeR]
module.exports =  function randomArray(n, rangeL, rangeR){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr[i] = Math.floor(Math.random() * (rangeR - rangeL + 1)) + rangeL;
    }
    return arr;
}
