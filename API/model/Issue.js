const mongoose = require('mongoose');

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

const IssueModel = mongoose.model('Issue', IssueSchema);
module.exports = IssueModel;
