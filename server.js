//loasind express
const express = require('express');
const app = express();

app.use(express.json())

const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb://localhost:27017/', (err, client) => {    
    db = client.db('webstore')
});