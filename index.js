const express = require('express');
const dotenv = require('dotenv');
const util = require('util');
const body_parser = require('body-parser');
const text_parser = body_parser.text();
dotenv.config();
const app = express();
const fetch = require('node-fetch');
app.listen(process.env.PORT, () => {
    console.log("listening on port " + process.env.PORT);
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

app.use(express.static('public'));
app.use(express.json());

app.post('/', text_parser, (req, res) => {
    // console.log("Request body: "+util.inspect(req.body, false, null));
    fetch(`https://dev.to/api/articles?api-key=${process.env.APIKEY}&username=${req.body}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            if(data.length > 0){
                res.send({blogs: data})
            } else {
                res.send({blogs: []})
            }
        }).catch((err) => {
            console.error(err);
        })
})
