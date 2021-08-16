const H = require('highland');


// run this file, you'll notice something is wrong, fix the testFunction.

const inputArr = [1,2,3,4,5,6,7,8,9,10]

//desired output:
/*
[
  { name: 'jack', age: 2 },
  { name: 'jack', age: 4 },
  { name: 'jack', age: 6 },
  { name: 'jack', age: 8 },
  { name: 'jack', age: 10 },
  { name: 'jack', age: 12 },
  { name: 'jack', age: 14 },
  { name: 'jack', age: 16 },
  { name: 'jack', age: 18 },
  { name: 'jack', age: 20 }
]
 */





const testFunction = (input) => {
    return H([{name:'jack',age:input}])
}

H(inputArr)
    .flatMap(item =>{
        return testFunction(item)
    })
    .collect()
    .toCallback((err, result)=>{
        console.log('Expected Output:')
        console.log('end of stream', result)
    })




























/***************************
 SOLUTION
 */

// const testFunction = (input) => {
//     return [{name:'jack',age:input}]
// }


//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
