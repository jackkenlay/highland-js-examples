const H = require('highland');


// Create a stream that products the desired result using the function provided

const inputArr = [1,2,3,4,5,6,7,8,9,10]

//desired output:
/*
[
  { name: 'jack', age: 1 },
  { name: 'jack', age: 2 },
  { name: 'jack', age: 3 },
  { name: 'jack', age: 4 },
  { name: 'jack', age: 5 },
  { name: 'jack', age: 6 },
  { name: 'jack', age: 7 },
  { name: 'jack', age: 8 },
  { name: 'jack', age: 9 },
  { name: 'jack', age: 10 }
]
 */





const testFunction = (input) => {
    return H([{name:'jack',age:input}])
}


H(inputArr)
    //input code here
    .collect()
    .toCallback((err, result)=>{
        console.log('end of stream', result)
    })



























/***************************
 SOLUTION
 */

H(inputArr)
    .flatMap(item =>{
        return testFunction(item)
    })
    .collect()
    .toCallback((err, result)=>{
        console.log('end of stream', result)
    })





//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
