const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Pildata = new Schema({
  firstName: String,
  lastName: String,
  dob: String,
  gender: String,
  nationality: String,
  province: String, 
  username: String,
  email: String, 
  phoneNumber: Number,
  password: String 
});

const UserData = mongoose.model("UserData",Pildata);

module.exports = UserData;