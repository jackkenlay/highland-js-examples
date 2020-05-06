const express = require('express')
const app = express()
const port = 3000
const _ = require('lodash')

app.get('/', (req, res) => {
    const {i} = req.query
    console.log('Request come in!!! ------------------, i is:',i)
    setTimeout(()=>{
        res.setHeader('Content-Type', 'application/json');
        // res.end(JSON.stringify({ a: 1 }));
        if(i < 5){
            return res.json(getRandomArrayOfStuff())
        } else{
            return res.json([])
        }

    },3000)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))



const getRandomArrayOfStuff = () => {
    const randomText = ['hello','i love streams lol...','heee','cow','pig','sheep','Hola','I','am','the','greatest','off all','time','said','mohammed','ali']
    return _.sampleSize(randomText,3)
}
