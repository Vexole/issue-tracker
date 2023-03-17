const { UserInputError } = require('apollo-server-express');
const { getIssuesList, insertIssue } = require('./db');

function validateIssue(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status === 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function getIssues() {
  return getIssuesList();
}

function addIssue(_, { issue: argIssue }) {
  const issue = { ...argIssue };
  issue.created = new Date();
  validateIssue(issue);
  return insertIssue(issue);
}

module.exports = { getIssues, addIssue };
