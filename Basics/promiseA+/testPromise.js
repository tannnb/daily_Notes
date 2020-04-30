let Promise = require('./promise')

// 基础同步 easy.js
/*new Promise((resolve, reject) => {
     reject('err')
}).then(data => {
    console.log('data:', data)
}, err => {
    console.log('err:', err)
})*/


// 异步promise async-easy
/*let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    })
})
promise.then(data => {
    console.log('data1:', data)
}, err => {
    console.log('err1:', err)
})
promise.then(data => {
    console.log('data2:', data)
}, err => {
    console.log('err2:', err)
})*/



// 链式调用
/*let promise = new Promise((resolve, reject) => {
    resolve('success')
}).then(data => {
    console.log('data1:', data)
    return 1000
}, err => {
    console.log('err1:', err)
}).then(data => {
    console.log('data2:', data)
}, err => {
    console.log('err2:', err)
})*/



let p = new Promise((resolve, reject) => {
    resolve(1000)
})

let promise2 = p.then(data => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve('hello Promise')
        },1000)
    })

})
promise2.then(data => {
    console.log("data2:", data)
}, err => {
    console.log("err:", err)
}).then(data => {
    console.log('data3:',data)
})
