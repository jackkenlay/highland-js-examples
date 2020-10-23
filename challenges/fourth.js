const H = require('highland');


// Create a stream that products the desired result

const inputArr = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]

//desired output:
// [1,2,3,4,5,6,7,8,9,10]
































/***************************
 SOLUTION
 */

H(inputArr)
    .flatten()
    .collect()
    .toCallback((err, result)=>{
        console.log('end of stream', result)
    })





//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
