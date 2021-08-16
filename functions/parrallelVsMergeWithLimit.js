const H = require('highland')

const testArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]


/*
Parallel vs Merge or MergeWithLimit
Scenario could be one of the many feed requests in feed.js to the itemstore.
If one of the earlier requests takes ages and we use parallel, parallel must put everything back in the original order
however, does merge allow the other streams to continue faster?

Answer = yes, in this scenario.
The array arrives unordered. So this could help.
 */

const exampleHTTPRequest = (item,cb) => {
    // takes 5 seconds if its item 1
    let time = 1000;
    if(item === 1){
        time = 5000
    }

    return setTimeout(()=>{
        cb(null,item)
    },time)
}

// scenario with parallel
console.time("test");
return H(testArr)
    .tap(item =>{
        console.log('item a: ',item)
    })
    .map(H.wrapCallback(exampleHTTPRequest))
    .parallel(2)
    .tap(item =>{
        console.log('item c: ',item)
    })
    .collect()
    .toCallback((err ,item) => {
        if(err) console.log('ERROR',err)
        console.log('END ITEM')
        console.log(item)
        console.timeEnd("test");
    })
//
//
// return H(testArr)
//     .tap(item =>{
//         console.log('item a: ',item)
//     })
//     .map(H.wrapCallback(exampleHTTPRequest))
//     .mergeWithLimit(2)
//     .tap(item =>{
//         console.log('item c: ',item)
//     })
//     .collect()
//     .toCallback((err ,item) => {
//         if(err) console.log('ERROR',err)
//         console.log('END ITEM')
//         console.log(item)
//         console.timeEnd("test");
//     })
