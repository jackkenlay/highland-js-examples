const H = require('highland');


// Whats an easy way of streaming off the outputs of this function, then to a promise?

function testFunction (callback){
    let i = 0
    setInterval(()=>{
        callback(i)
    },1000)
}




//desired output:
/*
hi 0
hi 1
hi 2
hi 3
hi 4
hi 5
etc...
 */




























/***************************
 SOLUTION
 */


const fs = require('fs')
// H.wrapCallback(testFunction)
H.wrapCallback(fs.readFile)


(async()=>{//can only use await in async function of course

    // await mynewStream().tap((item)=>{
    //     console.log('hi: ',item)
    // }).toPromise()


    // return mynewStream().apply(item => {
    //     console.log('item')
    // })

})()



//DO NOT REMOVE: this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);
