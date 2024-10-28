/*const mongoose = require('mongoose');
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
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // هذا السطر يربط القروب بالمستخدم

});

module.exports = mongoose.model('Group', groupSchema);*/



const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    groupNumber: { type: Number, required: true, unique: true }, 
    governorate: { type: String, required: true },
    groupSize: { type: Number, required: true },
    groupID: { type: Number, required: true, default: function() { return Math.floor(Math.random() * 100000); } }  
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
