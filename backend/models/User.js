const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  wallet: { type: String, required: true },
  name: { type: String },
  image: { type: String, required: true },
  password: { type: String, minlength: 6 },
  location: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

module.exports = mongoose.model("User", UserSchema);
