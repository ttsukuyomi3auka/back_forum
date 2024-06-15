
require("dotenv").config();
const express = require('express');
const router = require('./routes/index.js')
var cors = require("cors")
const { HOST_PORT, MONGO_URL } = process.env

const corsOptions = {
    origin: `http://localhost:${HOST_PORT}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

const app = express();
app.use(express.json())
app.use('/api', router)
app.use(cors(corsOptions));


const mongoose = require("mongoose");



app.listen(HOST_PORT, async () => {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`http://localhost:${HOST_PORT}`);
});