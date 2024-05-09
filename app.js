
require("dotenv").config();
const express = require('express');
const router = require('./routes/index.js')


const app = express();
app.use(express.json())
app.use('/api', router)


const mongoose = require("mongoose");
const { HOST_PORT, MONGO_URL } = process.env


app.listen(HOST_PORT, async () => {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`http://localhost:${HOST_PORT}`);
});