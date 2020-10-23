const H = require('highland');


// Create a stream that prints the following array's items, every one second

const first = [1,2,3,4,5,6,7,8,9,10]

































/***************************
 SOLUTION
 */

H(first)
    .ratelimit(1, 1000) // https://caolan.github.io/highland/#ratelimit
    .tap((number) => {
        console.log(number)
    })
    .collect()
    .toCallback((err, result)=>{
        console.log('end of stream', result)
    })





//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
