import node from 'node:module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express'
import dotenv from 'dotenv';
import util from 'util';
import body_parser from 'body-parser';
import fetch from 'node-fetch';
const text_parser = body_parser.text();
dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

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
    fetch(`https://dev.to/api/articles?api-key=${process.env.APIKEY}&username=${req.body}&state=all`)
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
