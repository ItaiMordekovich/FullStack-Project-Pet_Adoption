const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:  {
        required: true,
        unique: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    firstName: {
        required: true,
        type: String
    },
    lastName: {
        required: true,
        type: String
    },
    phNumber: {
        required: true,
        type: String
    },
    petsLiked:{
        type: Array,
        required: true,
    },
    petsAdopted: {
        type:Array,
        required: true,
    },
    petsFostered: {
        type:Array,
        required: true,
    }
}, {collection: 'Users'})

module.exports = mongoose.model('user', userSchema)

