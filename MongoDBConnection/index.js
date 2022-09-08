// Loads the configuration from config.env to process.env
require('dotenv').config({path: './conf.env'});

const express = require('express')
const cors = require('cors');
// get MongoDBdriver connection
const dbo = require('./db/conn');

const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json());
app.use(require('./routes/record'));

// Global error handling
app.use((err, _req, res)=>{
    console.error(err.stack);
    res.status(500).send('Somethig broke!');
});

// perform a database connection when the server start
dbo.connectToServer((err)=>{
    if(err){
        console.error(err);
        process.exit();
    }
    // Start the Express server
    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`)
    });
});