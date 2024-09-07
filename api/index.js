const express = require('express');
const cors=require('cors');
require('dotenv').config();
const Transaction=require('./models/Transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

// Middleware to parse JSON bodies in POST requests
app.use(cors());
app.use(express.json());


// Define a test route
app.get('/api/test', (req, res) => {
  res.json({ body: 'Test endpoint working!' });
});

// Define a POST route for transactions
app.post('/api/transaction', async(req, res) => {
  console.log(process.env.MONGO_URL);
  await mongoose.connect(process.env.MONGO_URL)
  const {name,description,datetime,price} = req.body;
  const transaction= await Transaction.create({name,description,datetime,price});
  res.json(transaction);  // Echoes back the request body as JSON
});


app.get('/api/transactions',async(req,res) =>{
  await mongoose.connect(process.env.MONGO_URL);
  const transactions =await Transaction.find({});
  res.json(transactions);
});
// Start the server
const PORT = 4040;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


