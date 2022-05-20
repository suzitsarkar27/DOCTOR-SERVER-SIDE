const express = require('express')
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors=require('cors');
const app = express()
const port = process.env.PORT || 5000;


// middel aware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tc7h8.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
  try {

    await client.connect();
    const datacollection = client.db("data").collection("servic");
    const bookingCollection = client.db("booking").collection("data");
    app.get("/data", async (req, res) => {
      const query = {};
      const cursor = datacollection.find(query);
      const service = await cursor.toArray();
      res.send(service);
    });

    //  BOOKING POST
    app.get('/booking',async(req,res)=>{
      const booking =req.body;
      const result =bookingCollection.insertOne(booking);
      res.send(result);
    })
  } 
  finally {
   
  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("DOCTOR MONGODB CRUD IS RUNNING");
});
app.listen(port, () => {
  console.log("LISTING CRUD IS RUNNING", port);
});