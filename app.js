const H = require('highland');


//Create Array (numbers
// let test = [];
// for(let i = 0; i < 100; i++){
//     test.push(i);
// }

//Stream it with rate of 1, 1000
// var nums = H(test).map(function (x) {
//     return Number(x);
// })

// const test = [{name:'jack', age:6},{name:'dave', age:9}, {name:'tom', age:12}]
const test = [[{name:'jack', age:6},{name:'dave', age:9}, {name:'tom', age:12}],[{name:'jim', age:12}]]

console.log('input to stream', test)

H(test)
.ratelimit(1, 1000) //passes objects down the streams 1 per second

//Highland functions, add in anything you want below:

.tap(item => console.log('current item A:',item))
// .batchWithTimeOrCount(4000, 2)
// .doto ( items => console.log ( `First Doto: ${items}` ) )
// .filter(function (x) {
//     return x % 2 === 0;
// })
    .flatten()
    .tap(item => console.log('current item B:',item))
    .ratelimit(1, 1000)
.flatMap(item =>{
    //flat maps must return a stream
    item.hobby = 'coding'
    return H([item])
})
.map(item => {
    item.age = 9;
    return item;
})
// .tap(item => console.log('current item line 33:',item))
// .doto ( items => console.log ( `Second Doto: ${items}` ) )
// .consume(function (err, x, push, next) {
//     console.log('consume');
// });
.collect()
.toCallback((err, result)=>{
    console.log('end of stream', result)
})



//this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
