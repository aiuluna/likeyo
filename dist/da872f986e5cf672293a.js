import { a } from './src/a.js'
import { b } from './src/b.js'

const arr = [1,2,3]
arr.flat()
for (let x of arr) {
	console.log(x)
}
console.log(a + b)
