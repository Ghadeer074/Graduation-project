const mongoose = require('mongoose');

const pilgrimSchema = new mongoose.Schema({
    passportNumber: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    nationality: { type: String, required: true },
    province: { type: String, required: true },
    dateAndTime: { type: Date, required: true },
    destination: { type: String, required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true } /////////
});

//const PilgrimModel = mongoose.model('PilgrimModel', pilgrimSchema);
const PilgrimModel = mongoose.models.PilgrimModel || mongoose.model('PilgrimModel', pilgrimSchema);/////////


module.exports = PilgrimModel;


