const mongoose = require('mongoose');

const restSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required:true

    },
    emailId: {
        type: 'string',
        required:true
    },
    dateOfJoining: {
        type: 'date',
        required:true,
        default: Date.now()
    }
})

module.exports = mongoose.model('restData',restSchema)