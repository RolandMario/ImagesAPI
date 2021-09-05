//Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./db/database/db.js");
const athletes = require('./routes/Athletes');
const detailView = require('./routes/DetailView')


// create an instance of express server
const app = express();
//middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors());
app.use('/home', athletes);
app.use('/detail', detailView)

 
app.listen(3001, ()=>{
    console.log("server is running at port 3001");
})