const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'


class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined

        // 判断status状态只能由PENDING变成RESOLVED或REJECTED
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.value = reason
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
        if(this.status === RESOLVED) {
            onFulfilled(this.value)
        }
        if(this.status === REJECTED) {
            onRejected(this.reason)
        }
    }

}

module.exports = Promise
