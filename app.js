const _ = require('highland');


//Create Array
let test = [];
for(let i = 0; i < 100; i++){
    test.push(i);
}

//Stream it with rate of 1, 1000
var nums = _(test).map(function (x) {
    return Number(x);
})
.ratelimit(1, 1000)

//Highland functions, add in anything you want:


// .batchWithTimeOrCount(4000, 2)
.doto ( items => console.log ( `First Doto: ${items}` ) )
// .filter(function (x) {
//     return x % 2 === 0;
// })
.doto ( items => console.log ( `Second Doto: ${items}` ) )
// .consume(function (err, x, push, next) {
//     console.log('consume');
// });

console.log('After stream:')
nums.each(function (n) { 
    console.log(n); 
});


//this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);