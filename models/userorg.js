const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orgdata = new Schema({
  firstName: String,
  lastName: String,
  orgname: String,
  orgnum: Number,
  email: String, 
  phoneNumber: Number,
  password: String 
});

const UserData = mongoose.model("UserData",Orgdata);

module.exports = UserData;