const H = require('highland')

const testArr = [1,2,3,4,5,6]

return H(testArr)
    .tap(item => {
        console.log('aaaa')
        console.log(item)
    })
    .map(item => {
        console.log('aaa item',item)
        return H([item]) //works
        // return item // DOESNT WORK BUT WHY>!>!>!
    })
    .sequence(item => { // sequence expects a stream, if you changed the above to flatMap, it wouldn't work since it flattens it
        console.log('bbbb')
        console.log(item)
    })
    .collect()
    .toCallback((err ,item) => {
    if(err) console.log('ERROR',err)
        console.log('END ITEM')
        console.log(item)
    })
