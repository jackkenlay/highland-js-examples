const H = require('highland');


// Using the functions provided, produce the desired output.

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

const ageIncrementFunction = (input) => {
    const ageTimesTwo = input.age * 2
    return {
        ...input,
        age:ageTimesTwo
    }
}


H(inputArr)
    //input your code here
    .collect()
    .toCallback((err, result)=>{
        console.log('Expected Output:')
        console.log('end of stream', result)
    })



























/***************************
 SOLUTION
 */

H(inputArr)
    .flatMap(item =>{
        return testFunction(item)
    })
    .map((item)=>{
        return ageIncrementFunction(item)
    })
    .collect()
    .toCallback((err, result)=>{
        console.log('Expected Output:')
        console.log('end of stream', result)
    })


// OR

// (Example of 'point free style programming')

// H(inputArr)
//     .flatMap(testFunction)
//     .map(ageIncrementFunction)
//     .collect()
//     .toCallback((err, result)=>{
//         console.log('Expected Output:')
//         console.log('end of stream', result)
//     })



//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
