const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserPassSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
    required: true,
  },
  passId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Pass",
    required: true,
  },
  contractId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "UserContract",
    required: true,
  },
  purchaseDateTime: { type: Number, required: true },
  contractDateTime: { type: Number },
  active: { type: Boolean, required: true },
});

module.exports = mongoose.model("UserPass", UserPassSchema);
