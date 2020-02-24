var mongoose = require('mongoose');

let Staff = mongoose.model('Staff', {
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = {
    Staff: Staff
}