var express = require('express');
var app = express();
const MongoClient = require('mongodb').MongoClient;
const port = process.env.PORT || 3000;
app.use(express.json());

MongoClient.connect('mongodb+srv://Ayaan:mongoman@cw2.3oel9.mongodb.net/', {useUnifiedTopology: true}, (err, client) => {    
    db = client.db('webstore');
});

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

 
app.get('/', (req,res,next)=>{
    res.send('This is working!');
});
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName);
    return next();
});
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}, {limit: 13}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results);
    });
});
app.post('/collection/:collectionName', (req,res,next)=>{
    req.collection.insert(req.body, (e, results)=>{
        if (e) return next(e)
        res.send(results.ops);
    });
});
app.listen(port, () => {
    console.log('Express server is running at localhost:3000');
});

