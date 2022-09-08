const express = require('express');

// recordRoutes is an interface of the express router.
// We use it to define our router
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This section will help you get a list of all the records
recordRoutes.route('/listings').get(async (req, res)=>{
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
recordRoutes.route('/listings/recordSwipe').post((req, res)=>{
    // Insert swipe information
    const dbConnect = dbo.getDb();
    const matchDocument = {'restaurant_id' : req.body.id, 'URL': req.body.URL, 'address': req.body.address,
                        'name': req.body.name, 'outcode': req.body.outcode, 
                        'postcode': req.body.postcode, 'rating': req.body.rating, 'type_of_food': req.body.type_of_food};
    
    dbConnect.collection('matches').insertOne(matchDocument, (err, result)=>{
        if(err){
            res.status(400).send('Error inserting matches!');
        } else {
            console.log(`Added a mew match with id ${result.insertedId}`);
            res.status(204).send();
        }
    });
});

// This section will help you update a record by id
recordRoutes.route('/listings/updateLike').post((req, res)=>{
    // Update likes
    const dbConnect = dbo.getDb();
    const restaurantQuery = { 'id': req.body.id};
    const updates = {
        $inc: {likes: 1}
    }; 

    dbConnect.collection('restaurants').updateOne(restaurantQuery, updates, (err, result)=>{
        if(err){
            res.status(400).send(`Error updating likes on restaurant with id ${restaurantQuery.id}!`);
        } else{
            console.log('1 document updated');
        }
    });

});

// This section will help you delete a record
recordRoutes.route('/listings/recordDelete').post((req, res)=>{
    // Insert swipe information
    const dbConnect = dbo.getDb();
    const restaurantQuery = {'restaurant_id': req.body.id};

    dbConnect('restaurants').deleteOne(restaurantQuery, (err, result)=>{
        if(err){
            restaurantQuery.status(400).send(`Error deleting listing with id ${restaurantQuery.restaurant_id}!`);
        } else {
            console.log('1 document deleted!');
        }
    });
});

module.exports = recordRoutes;