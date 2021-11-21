require('rootpath')();

/* To create the REST API's */
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
let mongoose = require("mongoose");
const errorHandler = require('_helpers/error-handler');
let dbStr = "mongodb://localhost/org_dashboard";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// api routes
app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
    dbConn()
});



//Route setup:
let managerRouter = require("./manager/controller");
let workerRouter = require("./worker/controller");
app.use("/api",managerRouter);
app.use("/api",workerRouter);

// MONGO DB connection 
let dbConn = async () => {
    try {
       await mongoose.connect(dbStr, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, () => {
          console.log("\x1b[42m\x1b[30m%s\x1b[0m", "Mongo DB - CONNECTED SUCCESSFULLY");
       }
       );
 
    } catch (err) {
       // console.log("error: " + err);
       console.log("\x1b[41m%s\x1b[0m", "Mongo DB - NOT CONNECTED");
    }


 
 }