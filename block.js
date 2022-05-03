const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const block = (data) => {
    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ' + err)
    })
    rl.on('SIGINT', () => {
        console.log(data)
        rl.pause()
    })

    
}

module.exports = {
    block
}