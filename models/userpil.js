const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pildata = new Schema({
  firstName: { type: String, required: true},
  lastName:{ type: String, required: true},
  dob:{ type: String, required: true},
  gender: { type: String, required: true},
  nationality:{ type: String, required: true},
  province: { type: String, required: true}, 
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, 
  phoneNumber: { type: Number, required: true},
  password:{ type: String, required: true, unique: true } 
});

const Pilgrim = mongoose.model("Pilgrim",Pildata);

module.exports = Pilgrim;