const { Schema, model } = require("mongoose");

module.exports = model(
  "Embed",
  new Schema({
    _id: String,
    users: [Object],
    categories: [Object],
  })
);