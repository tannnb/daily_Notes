const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'


class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolbedCallbacks = []     // 保存异步成功回调
        this.onRejectedCallbacks = []     // 保存异步失败回调

        // 判断status状态只能由PENDING变成RESOLVED或REJECTED
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolbedCallbacks.forEach(fn => fn())  // 发布
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.value = reason
                this.onRejectedCallbacks.forEach(fn => fn())  // 发布
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
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                try {
                    let x = onFulfilled(this.value)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }
            if (this.status === REJECTED) {
                try {
                    let x = onRejected(this.reason)
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            }

            // 如果是异步就先订阅
            if (this.status === PENDING) {
                try {
                    this.onResolbedCallbacks.push(() => {
                        onFulfilled(this.value)
                    })
                } catch (e) {
                    reject(e)
                }

                try {
                    this.onRejectedCallbacks.push(() => {
                        onRejected(this.reason)
                    })
                } catch (e) {
                    reject(e)
                }
            }
        })
        return promise2
    }

}

module.exports = Promise
