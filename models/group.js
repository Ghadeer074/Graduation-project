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
    groupID: { type: String, required: true, unique: true }, // يجب أن يكون فريدًا
    groupNumber: { type: Number, required: true, unique: true }, 
    governorate: { type: String, required: true },
    groupSize: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'userpil' } // يجب أن يكون هناك رابط للمستخدم
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;















