const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 6001;
const jwt = require('jsonwebtoken');
require('dotenv').config()


//middleware
app.use(cors());
app.use(express.json());

//mongodb configuration using mongoose

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@demo-foodie-client.ob6waw6.mongodb.net/demo-foodie-client?retryWrites=true&w=majority&appName=demo-foodie-client`
  )
  .then(console.log("Mongoose Connected Successfully!"))
  .catch((error) => console.log("Error connecting to mongodb ", error));

  //jwt authentication
  app.post('/jwt', async(req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    })
    res.send({token})
  })

  


  //import routes here
  const MenuRoutes = require('./api/routes/MenuRoutes');
  const CartRoutes = require('./api/routes/CartRoutes');
  const UserRoutes = require('./api/routes/UserRoutes')
  app.use('/cart', CartRoutes);
  app.use('/menu', MenuRoutes);
  app.use('/users', UserRoutes);


app.get("/",(req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
