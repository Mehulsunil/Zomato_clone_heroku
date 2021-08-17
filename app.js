const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');


const appRouter = require('./Router/index.js');

const port = 2031;
const host = 'localhost';

const app = express();


app.use(cors());
app.options('*', cors());

app.use(express.json());// to read data from the body(POST)
app.use('/', appRouter);// to read data from the params(GET)


mongoose.connect('mongodb+srv://test_User1:omPPbsGf8vqdGjMj@cluster0.g8n2c.mongodb.net/DB1?retryWrites=true&w=majority').then(
    // (sir data)mongodb+srv://testUser:KX7DmNtfCHf4fGYK@cluster0.g8n2c.mongodb.net/TestDB?retryWrites=true&w=majority
    // (my data)mongodb+srv://test_User1:omPPbsGf8vqdGjMj@cluster0.g8n2c.mongodb.net/DB1?retryWrites=true&w=majority

    app.listen(port, host, () => {
        console.log(`Server is running on ${host}: ${port}`);
    })
).catch(err => console.log(err));




