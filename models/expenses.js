const mongoose = require('mongoose');

const expencesSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
    },
    data: [{
        date: {
            type: Date,
            require: true
        },
        paidTo: {
            type: String,
            default: ""
        },
        paidFor: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            default: ""
        },
        balance: {
            type: Number,
            required: true
        },
    }],
    currentBalance: {
        type: Number,
        required: true,
        default: 0

    }
},
);

module.exports = mongoose.model('Expencses', expencesSchema);