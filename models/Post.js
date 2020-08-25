const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  userID: { type: String, required: true },
  deviceID: { type: String, required: true },
  date: { type: Date, default: Date.now },
  queryText: { type: String, required: true },
});

module.exports = mongoose.model("Posts", PostSchema);
