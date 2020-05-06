const H = require('highland');

const request = require("request");
const parseResponse = require("highland-parse-response");

//this is used to keep Node active and stop it from exiting
setInterval(function() {
}, 1000 * 60 * 60);

const paginationRequest = ({i=1, numberOfPages=10 , items=[] }) =>{

    return H.wrapCallback(request)({
        url: `http://localhost:3000/?i=${i}`,
        json:true
    }).flatMap(parseResponse)
        .flatten()
        .collect()
        .flatMap(function (result) {
            console.log('Response from server: ',result)
            i++
            if((i > numberOfPages) || (result.length === 0)){

                if(result.length !== 0){
                    items.push(result)
                } else {
                    console.log('No more results from server, ending stream.')
                }
                console.log('Stream ended, all items: ', items)
                return items
            } else {
                items.push(result)
                return H(paginationRequest({i,numberOfPages, items}))
            }
        })
}

H(['initial item :)'])
    .flatMap((item)=>{
        console.log('first item', item)

        return H(paginationRequest({}))
            .collect()
            .map(responses =>{
                return [
                    item,
                    ...responses
                ]
            })
    })
    .tap(item => console.log('tap item: ',item))
    .errors(function (err, push) {
        console.log('error fucked it', err)
        push(null, {});
    })
    .flatten()
    .collect()
    .toCallback((err, result)=>{
        console.log('end of stream', result)
    })


