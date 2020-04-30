const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    // 判断x是普通值还是promise，则调用对应的状态

    // 判断promise的值和x是否为同一个值，抛出错误，防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    // 如果x为对象或函数
    if (typeof x === 'object' && typeof x !== null || typeof x === 'function') {
        let called; // 保证只能调用一次成功或者失败，防止多次调用
        try {
            let then = x.then  // then有可能是通过defineProperty来定义

            if (typeof then === 'function') {
                then.call(x,
                    (y) => {
                        if (called) return
                        called = true

                        // 采用promise的成功结果将值乡下传递
                        // 如果返回的y为promise继续自行递归，指导y为一个普通值为止
                        resolvePromise(promise2, y, resolve, reject)
                    },
                    (r) => {
                        if (called) return
                        called = true

                        reject(r) // 采用失败值向下传递
                    })
            } else {
                resolve(x) // 说明x是一个普通对象非函数
            }
        } catch (e) {
            if (!called) return
            called = true

            reject(e)
        }
    } else {
        // x为一个普通值,直接让promise2成即可
        resolve(x)
    }

}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolbedCallbacks = []
        this.onRejectedCallbacks = []

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolbedCallbacks.forEach(fn => fn())      // 发布
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            // 立即执行 执行器
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }

    then(onFulfilled, onRejected) {
        // onFulfilled  onRejected 是可选参数
        // 处理成then(data => return data) 吧值传递下去
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
        onRejected = typeof onRejected === 'function' ? onFulfilled : err => { throw err }


        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    // 为了保证promise2已经new完成
                    try {
                        let x = onFulfilled(this.value)
                        // 判断x是普通值，则调用resolve
                        // 如果是promise值，则调用resolve或reject
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                // 如果是异步就先订阅
                this.onResolbedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        })
        return promise2
    }
}


module.exports = Promise
