const Issue = require('../model/Issue');
const Counter = require('../model/Counter');

const issues = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2018-08-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2018-08-16'),
    due: new Date('2018-08-30'),
    title: 'Missing bottom border on panel',
  },
];

async function seedData() {
  await Issue.deleteMany({});
  await Counter.deleteMany({});
  await Issue.insertMany(issues);
  await Counter.create({ _id: 'issues', current: 3 });
}

async function getNextSequence(name) {
  const result = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { current: 1 } },
    { returnOriginal: false },
  );
  return result.current;
}

async function insertIssue(argIssue) {
  const issue = { ...argIssue };
  issue.id = await getNextSequence('issues');
  const result = await Issue.create(issue);
  const savedIssue = await Issue.findById(result._id);
  return savedIssue;
}

async function getIssuesList() {
  const issuesList = await Issue.find({});
  return issuesList;
}

module.exports = { seedData, insertIssue, getIssuesList };
