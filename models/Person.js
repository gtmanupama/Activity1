const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonSchema = new Schema({
    username: {
        type: String,
        required: true
    }
})

module.exports = Person = mongoose.model('myPerson', PersonSchema)

