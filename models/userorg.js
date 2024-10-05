const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Orgdata = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  OrganizationtName: { type: String, required: true },
  OrganizationNumber: { type: Number, required: true, unique: true },  // Ensure unique org number
  email: { type: String, required: true, unique: true },   // Ensure unique email
  phoneNumber: { type: Number, required: true },
  password: { type: String, required: true ,unique: true }
});


const Organizer = mongoose.model('Organizer', Orgdata);


module.exports = Organizer;