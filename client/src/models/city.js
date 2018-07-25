const mongoose = require('mongoose');
const { Schema } = mongoose;

let commentSchema = new Schema({
  comment: String,
  user: String
});

let citySchema = new Schema({
  name: String,
  country: String,
  icon: String,
  feelslike_c: Number,
  feelslike_f: Number,
  text: String,
  humidity:Number,
  comments: [commentSchema]
});

let City = mongoose.model('city', citySchema);

module.exports = City;
