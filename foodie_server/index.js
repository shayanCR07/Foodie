const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 6001;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

//mongoDB config

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodie-cluster.kulgbmc.mongodb.net/?retryWrites=true&w=majority&appName=demo-foodie-cluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    //database and connections
    const menuCollections = client.db("demo-foodie-client").collection("menu");
    const cartCollections = client
      .db("demo-foodie-client")
      .collection("cartItems");

    //all menu items operations
    app.get("/menu", async (req, res) => {
      const result = await menuCollections.find().toArray();
      res.send(result);
    });

    //all carts operations

    //Posting Cart to DB
    app.post('/carts', async(req, res) => {
      const cartItem = req.body;
      const result = await cartCollections.insertOne(cartItem);
      res.send(result);
    })

    app.get('/carts', async(req, res) => {
      const email = req.query.email;
      const filter = {email: email};
      const result = await cartCollections.find(filter).toArray();
      res.send(result);
    })

    //get specific carts
    app.get('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.findOne(filter);
      res.send(result);
    })


    //delete items from the cart
    app.delete('/carts/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const result = await cartCollections.deleteOne(filter);
      res.send(result);
    })

    //update cart quantity
    app.put('/carts/:id', async(req, res)=> {
      const id = req.params.id;
      const {quantity} = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = { upsert: true};

      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10)
        }
      }

      const result = await cartCollections.updateOne(filter, updateDoc, options)
    })

    await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is listening on PORT: ${port}`);
});
