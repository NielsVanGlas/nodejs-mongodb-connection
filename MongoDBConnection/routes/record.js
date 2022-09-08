const express = require('express');
const ObjectId = require('mongodb').ObjectId; 

// recordRoutes is an interface of the express router.
// We use it to define our router
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records
recordRoutes.route('/restaurants').get(async (req, res)=>{
    // Get records
    const dbConnect = dbo.getDb();

    dbConnect.collection('restaurant').find({}).limit(50).toArray((err, result)=>{
        if(err){
            res.status(400).send('Error fetching restaurants!');
        } else{
            res.json(result);
        }
    });
});

// This section will help you create a new record
recordRoutes.route('/restaurants/recordSwipe').post((req, res)=>{
    // Insert swipe information
    const dbConnect = dbo.getDb();
    const restaurantDocument = {'URL': req.body.URL, 'address': req.body.address,
                        'name': req.body.name, 'outcode': req.body.outcode, 'raddress line 2' : req.body.address2, 
                        'postcode': req.body.postcode, 'rating': req.body.rating, 'type_of_food': req.body.type_of_food};
    
    dbConnect.collection('restaurant').insertOne(restaurantDocument, (err, result)=>{
        if(err){
            res.status(400).send('Error inserting restaurnat!');
        } else {
            console.log(`Added a mew match with id ${result.insertedId}`);
            res.status(204).send();
        }
    });
});

// This section will help you update a record by id
recordRoutes.route('/restaurants/updateLike').put((req, res)=>{
    // Update likes
    const dbConnect = dbo.getDb();
    const mongoObjId = new ObjectId(req.body.id);
    const restaurantQuery = {'_id': mongoObjId};
    const updates = {$set: {'rating': req.body.rating}}; 

    dbConnect.collection('restaurant').updateOne(restaurantQuery, updates, (err, result)=>{
        console.log(restaurantQuery)
        if(err){
            res.status(400).send(`Error updating likes on restaurant with id ${restaurantQuery.id}!`);
        } else{
            // console.log('1 document updated!');
            res.json(result);
        }
    });

});

// This section will help you delete a record
recordRoutes.route('/restaurants/delete').delete((req, res)=>{
    // Insert swipe information
    const dbConnect = dbo.getDb();

    const mongoObjId = new ObjectId(req.body.id); //req.params.id

    //const restaurantQuery = {'restaurant_id': };
    const restaurantQuery = {'_id': mongoObjId}; 
    
    dbConnect.collection('restaurant').deleteOne(restaurantQuery, (err, result)=>{
        if(err){
            res.status(400).send(`Error deleting restaurant with id ${req.body.id}!`);
        } else {
            // console.log('1 document deleted!');
            res.json(result);
        }
    });
});

module.exports = recordRoutes;
