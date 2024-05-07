// console.log('Hello Nodejs')
// console.log('Welcome here')

// const os = require('os')

// console.log(os.type())
// console.log(os.version())
// console.log(os.homedir())

// console.log(__dirname)
// console.log(__filename)

const path = require('path')
// const {add, sub, div, mult} = require('./Math')
// import { add } from './Math'
const {add} = require('./Math')


// console.log(path.dirname(__filename))
// console.log(path.basename(__filename))
// console.log(path.extname(__filename))



console.log(path.parse(__filename))

console.log(add(7, 3))
// console.log(sub(5, 3))
// console.log(div(8, 4))
// console.log(mult(2, 4))