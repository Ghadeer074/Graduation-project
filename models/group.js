const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupID: {
        type: Number,
        required: true
    },
    groupProvince: {
        type: String,
        required: true
    },
    groupSize: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Group', groupSchema);
