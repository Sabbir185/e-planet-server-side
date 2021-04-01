const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express()
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wgngx.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const collection = client.db("ePlanetShop").collection("eproducts");
  const orderCollection = client.db("ePlanetUser").collection("orders");
    // add product
    app.post('/addProduct', (req, res) => {
      const newProduct = req.body;
      collection.insertOne(newProduct)
      .then(result => {
          res.send(result.insertedCount > 0);
      })
    })

    // fetch data
    app.get('/products',(req, res)=>{
      collection.find({})
      .toArray((err, documents)=>{
        res.send(documents)
      })
    })

    // delete product
    app.delete('/delete/:id',(req, res) => {
        collection.deleteOne({ _id: ObjectId(req.params.id) })
        .then(result => {
          res.send(result.deletedCount > 0);
        })
    })

    // single product fetch
    app.get('/product/:id',(req, res) => {
      collection.find({ _id: ObjectId(req.params.id) })
      .toArray((err, document) => {
        res.send(document[0])
      })
    })

    // order save into database
    app.post('/addOrder', (req, res) => {
      const newOrder = req.body;
      console.log(newOrder)
      orderCollection.insertOne(newOrder)
      .then(result => {
          console.log(result.insertedCount)
          res.send(result.insertedCount > 0);
      })
    })


    // find total order of a user
    app.get('/orderList',(req, res) => {
      console.log(req.query.email)
      orderCollection.find({ email: req.query.email })
      .toArray((err, document) => {
        res.send(document)
      })
    })


});



app.listen(port)