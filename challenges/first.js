const H = require('highland');


// Create a stream that increments the following array by 1, and prints it in a callback

const first = [1,2,3,4,5,6,7,8,9,10]

































/***************************
SOLUTION
 */

H(first)
    .map((number) => {
        //https://caolan.github.io/highland/#map
        const newNumber = number+1;
        return newNumber
    })
    .collect()
    .toCallback((err, result)=>{
        console.log('Expected Output:')
        console.log('end of stream', result)
    })





//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
