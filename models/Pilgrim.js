const mongoose = require('mongoose');

const pilgrimSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
});

const Pilgrim = mongoose.models.Pilgrim || mongoose.model('Pilgrim', pilgrimSchema);

module.exports = Pilgrim;

