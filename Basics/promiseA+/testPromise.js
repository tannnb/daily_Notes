let Promise = require('./easy')

 new Promise((resolve, reject) => {
    //resolve('ok')
     reject('err')
}).then(data => {
    console.log('data:', data)
}, err => {
    console.log('err:', err)
})
