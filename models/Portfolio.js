const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Portfolio Schema
const PortfolioSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  link_demo: {
    type: String
  },
  link_github: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'default.jpg'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Portfolio = mongoose.model('portfolio', PortfolioSchema);
