const H = require('highland');


// Create a stream that changes all items in the following array to 1
// desired result: [1,1,1,1,1,1,1,1,1,1]

const test = [1,2,3,4,5,6,7,8,9,10]

































/***************************
 SOLUTION
 */

H(test)
    .map(item =>{
        return 1;
    })
    .collect()
    .toCallback((err, result)=>{
        console.log('Expected Output:')
        console.log('end of stream', result)
    })





//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
