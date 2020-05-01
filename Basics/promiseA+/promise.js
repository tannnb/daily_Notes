const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

function isFunction(value) {
    return typeof value === 'function'
}

function isObject(value) {
    return typeof value === 'object' && value !== null
}

function resolvePromise(promise2, x, resolve, reject) {
    // 判断x是普通值还是promise，则调用对应的状态

    // 判断promise的值和x是否为同一个值，抛出错误，防止循环引用
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }

    let called = false; // 保证只能调用一次成功或者失败，防止多次调用
    // 如果x为对象或函数
    if (isFunction(x) || isObject(x)) {
        try {
            let then = x.then  // then有可能是通过defineProperty来定义

            if (isFunction(then)) {
                then.call(
                    x,
                    (y) => {
                        if (called) return
                        called = true

                        // 采用promise的成功结果将值向下传递
                        // 如果返回的y为promise继续自行递归，直到y为一个普通值为止
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
        } catch (error) {
            if (!called) return
            called = true

            reject(error)
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
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.value = value
                    this.status = RESOLVED
                    this.onResolbedCallbacks.forEach(fn => fn())      // 发布
                }
            }, 0)
        }
        let reject = (reason) => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.reason = reason
                    this.status = REJECTED
                    this.onRejectedCallbacks.forEach(fn => fn())
                }
            }, 0)
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
        onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
        onRejected = isFunction(onRejected) ? onRejected : err => {
            throw err
        }


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
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
        })

        return promise2
    }

    static isPromise(value) {
        if (typeof value === 'object' && value !== null || typeof value === 'function') {
            if (typeof value.then === 'function') {
                return true;
            }
        } else {
            return false
        }
    }


    static all(values) {
        return new Promise((resolve, reject) => {
            let arr = []
            let index = 0

            let processData = (key, value) => {
                arr[key] = value
                if (++index === values.length) {
                    resolve(arr)
                }
            }

            for (let i = 0; i < values.length; i++) {
                let current = values[i]
                if (Promise.isPromise(current)) {
                    current.then(data => {
                        processData(i, data)
                    }, reject)
                } else {
                    processData(i, current)
                }
            }

        })
    }


    static resolve(value) {
        if(value instanceof Promise) {
            return value
        }
        return new Promise((resolve,reject) => {
            if(isObject(value) && isFunction(value)) {
                value.then(resolve, reject)
            }else {
                resolve(value)
            }
        })
    }

    finally(callback) {
        return this.then(
            (data) => Promise.resolve(callback()).then(() => data),
            (error) =>
                Promise.resolve(callback()).then(() => {
                    throw error
                })
        )
   }

}


Promise.defer = Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise
