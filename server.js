const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
const db = mongoose.connection;
db.on('error',(error)=> console.log(error))
db.once('open',()=>console.log("connected to mongodb"))

app.use(express.json())

const restDataRouter = require('./routes/restData');

app.use('/restRoute',restDataRouter)

app.listen(3000,()=> console.log("server started in port 3000"))