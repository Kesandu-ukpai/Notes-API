const express = require('express');
const app = express();
const db = require('./database');

app.use(express.json());



app.listen(3000, ()=>  {
    console.log('Server is running on port 3000');
})