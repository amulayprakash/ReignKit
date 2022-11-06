const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserContractSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
    required: true,
  },
  creationStartDate: { type: Number, required: true },
  deployed: { type: Boolean, required: true },
  deploymentCost: { type: Number },
  deploymentDateTime: { type: Number },
  network: { type: String, required: true },
  contractCode: { type: String },
});

module.exports = mongoose.model("UserContract", UserContractSchema);
