import express from "express";
import path from "path";
import fetch from "node-fetch";
import fs from "fs";

const config = JSON.parse(fs.readFileSync('src/config.json', 'utf-8'));
const host = config['host'];
const port = config['port'];
const group = config['group'];
const meetup_api_key = config['meetup_api_key'];

const app = express();

app.get('/', (req, res)=>res.send('hello'));

app.get('/api/events', (req, res) => {
    const req_events_url = `https://api.meetup.com/${group}/events?photo-host=secure&page=5`
    fetch(req_events_url
    ).then(function(res) {
        return res.json();
    }).then(function(json) {
        res.send(json);
    })
});

app.listen(port, ()=>(console.log(`Server started at ${host}:${port}`)))
