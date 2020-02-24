var mongoose = require('mongoose');

let Service = mongoose.model('Service' ,{
    date: {
        type: Date,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    expectedArrival: {
        type: String,
        required: false
    },
    roomNumber: {
        type: Number,
        required: true
    }
})

module.exports = {
    Service: Service
}