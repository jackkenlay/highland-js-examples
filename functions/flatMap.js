const H = require('highland')

const testArr = [1,2,3,4,5,6]

return H(testArr)
    .flatMap(item => {
        console.log('aaaa')
        console.log(item)
        return H([item])
    })
    .tap(item => {
        //TODO, flatmap should return an item, not a stream, check it isnt
        console.log('item a',item)
    })
    .flatMap(item => {
        console.log('cccc')
        console.log(item)
        return H([item])
    })
    .tap(item => {
        //TODO, flatmap should return an item, not a stream, check it isnt
        console.log('item b',item)
    })
    .flatMap(item => {
        console.log('eeeee')
        console.log(item)
        return H([item])
    })
    .tap(item => {
        //TODO, flatmap should return an item, not a stream, check it isnt
        console.log('item c',item)
    })
    .toCallback((err ,item) => {
        if(err) console.log('ERROR',err)
        console.log('END ITEM')
        console.log(item)
    })
