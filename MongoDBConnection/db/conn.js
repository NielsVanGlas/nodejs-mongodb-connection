const { MongoClient } = require('mongodb');
const connectionString = 'localhost:27017';
const client = new MongoClient(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

let dbConnection;

module.exports = { 
    connectToServer: (callback)=>{
    // Implement Database connection
        client.connect((err, db)=>{
            if(err || !db){
                return callback(err);
            }
        dbConnection = db.db('restaurants');
        console.log('Successfully connected to MongoDB');
        
        return callback();
    });
    },

    detDb: ()=>{
        return dbConnection;       
    },
};