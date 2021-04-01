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
    // add product
    app.post('/addProduct', (req, res) => {
      const newProduct = req.body;
      // console.log(newProduct);
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


});



app.listen(port)