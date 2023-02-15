const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const IssueSchema = mongoose.Schema({
  id: {
    type: Number,
    requried: [true, 'Please provide username'],
    unique: true,
  },
  title: String,
  status: String,
  owner: String,
  effort: Number,
  created: Date,
  due: Date,
});

IssueSchema.plugin(uniqueValidator, {
  message: '{PATH} must be unique. Please try with different value.',
});
const IssueModel = mongoose.model('Issue', IssueSchema);
module.exports = IssueModel;
