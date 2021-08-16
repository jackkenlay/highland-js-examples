const H = require('highland')

const testArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14]


/*
Parallel vs Merge or MergeWithLimit
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

(async () => {
    console.log('Beginning parallel vs mergeWithLimit test')
    console.log('Testing parallel:...')
    console.time("parallel");
    const parallelItems = await H(testArr)
        // .tap(item =>{
        //     console.log('parallel item a: ',item)
        // })
        .map(H.wrapCallback(exampleHTTPRequest))
        .parallel(2)
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
        .mergeWithLimit(2)
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
