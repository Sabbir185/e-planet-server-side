const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5055


app.get('/', (req, res) => {
  res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wgngx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect(err => {
  const collection = client.db(`${process.env.DB_DATABASE}`).collection(`${process.env.DB_COLLECTION}`);
    // perform actions on the collection object

    //   client.close();
});




app.listen(port)