const express = require('express');
const mongo = require('mongodb').MongoClient;

const app = express();

const port = 3000;
const url = 'mongodb://localhost:27017';

// create
app.post('/', (req, res)=>{
    restaurants.insertOne({'URL': req.body.URL, 'address': req.body.address, 
    'address line 2': req.body.address line 2, 'name': req.body.name, 'outcode': req.body.outcode, 
     'postcode': req.body.postcode, 'rating': req.body.rating, 'type_of_food': req.body.type_of_food});
});

// Read
app.get('/', (req, res)=>{
    
});

// Update
app.put('/', (req, res)=>{
    
});

// Delete5
app.delete('/', (req, res)=>{
    
});

// connect to db
let db;
let restaurants;

mongo.connect(
    url, {useNewUrlParser: true, useUnifiedTopology: true}, (err, results)=>{
        if(err){
            console.error(err)
            return
        }
        db = client.db('restaurants');
        restaurants = db.collections('restaurants');
    }
);

// server listener
app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`);
});
