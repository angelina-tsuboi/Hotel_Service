var mongoose = require('mongoose');

let Order = mongoose.model("Order", {
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
    Order :Order
}