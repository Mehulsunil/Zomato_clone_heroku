const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const SignupSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    } 
})

module.exports = mongoose.model('user', SignupSchema, 'users');   // exporting the model