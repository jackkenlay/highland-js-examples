const H = require('highland')

const testArr = [...Array(1000).keys()]


/*
Parallel vs Merge or MergeWithLimit
 */

const exampleHTTPRequest = (item,cb) => {
    // takes 5 seconds if its item 1
    let time = 100;

    // varying request times
    // if(item % 2 === 1){

    if(item === 1){
        time = 120
    }

    return setTimeout(()=>{
        cb(null,item)
    },time)
}

const CONCURRENT_STREAMS = 50;

(async () => {
    console.log('Beginning parallel vs mergeWithLimit test')
    console.log('Testing parallel:...')
    console.time("parallel");
    const parallelItems = await H(testArr)
        // .tap(item =>{
        //     console.log('parallel item a: ',item)
        // })
        .map(H.wrapCallback(exampleHTTPRequest))
        .parallel(CONCURRENT_STREAMS)
        // .tap(item =>{
        //     console.log('item c: ',item)
        // })
        .collect()
        .toPromise(Promise)

    console.log('End items:')
    console.log(parallelItems)
    console.log('Total time:')
    console.timeEnd("parallel");


    console.log('\n')


    console.log('Testing mergeWithLimit:')
    console.time("mergeWithLimit");

    const mergeWithLimitItems = await H(testArr)
        // .tap(item =>{
        //     console.log('mergeWithLimit item a: ',item)
        // })
        .map(H.wrapCallback(exampleHTTPRequest))
        .mergeWithLimit(CONCURRENT_STREAMS)
        // .tap(item =>{
        //     console.log('item c: ',item)
        // })
        .collect()
        .toPromise(Promise)


    console.log('End items:')
    console.log(mergeWithLimitItems)
    console.log('Total time:')
    console.timeEnd("mergeWithLimit");

})()
