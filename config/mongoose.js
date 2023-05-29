const mongoose = require('mongoose');
require('dotenv').config();
const {MONGODB_URL} = process.env;
mongoose.connect(MONGODB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
console.log(MONGODB_URL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"))

db.once('open', () =>{
    console.log("connecting to database :: MongoDB");
})

module.exports = db;

