const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const petSchema = new Schema({
    type:  {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    adoptionStatus: {
        required: true,
        type: String
    },
    picture: {
        type: String
    },
    height: {
        required: true,
        type: Number
    },
    weight: {
        required: true,
        type: Number
    },
    color: {
        type: String
    },
    bio: {
        type: String
    },
    hypoallergnic: {
        type: Boolean
    },
    dietery: {
        type: Array
    },
    breed: {
        type: String
    },
}, {collection: 'Pets'})

module.exports = mongoose.model('pet', petSchema)