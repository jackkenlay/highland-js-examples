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
//
// // const streamOutputExample = H()
// return H([1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16])
//     .tap(item =>{
//         console.log('item a: ',item)
//     })
//     .map(H.wrapCallback(exampleHTTPRequest))
//     .tap(item =>{
//         console.log('item c: ',item)
//     })
//     .parallel(4)
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


const exampleStreamEmitting = () => {
    return H([1,2,3,4,5,6]).ratelimit(1,1000).tap(item => {
        console.log('stream emitting: ', item)
    })
}

// const streamOutputExample = H()
return H([H(exampleStreamEmitting()),H(exampleStreamEmitting()),H(exampleStreamEmitting()),H(['a','b','c'])])
    .tap(item =>{
        console.log('item a: ',item)
    })

    .parallel(1) //notice how if it's just 1 allowed, then it has to go through each one
    //also notice how it breaks because parallel must get a stream
    .map(H.wrapCallback(exampleHTTPRequest))
    .tap(item =>{
        console.log('item c: ',item)
    })
    .tap(item =>{
        console.log('item c: ',item)
    })
    .collect()
    .toCallback((err ,item) => {
        if(err){
            console.log('ERROR',err)
        }
        console.log('END ITEM')
        console.log(item)
    })
