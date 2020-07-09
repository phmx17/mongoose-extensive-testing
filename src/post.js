const mongoose = require('mongoose');

const Schema = mongoose.Schema;

PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;