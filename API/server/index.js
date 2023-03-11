let aboutMessage = 'Hello World';
const URL =
  'mongodb+srv://bshrestha:03Md5BsmF2IiCGO9@cluster0.fm67amd.mongodb.net/issue_tracker';

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { getIssuesList, insertIssue, seedData } = require('./db');

const PORT = 4000;

const GraphQLDate = new GraphQLScalarType({
  name: 'GraphQLDate',
  description: 'A Date() type in GraphQL as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

const resolvers = {
  Query: {
    about: getMessage,
    issueList: getIssues,
  },
  Mutation: {
    setAboutMessage,
    addIssue,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }) {
  return (aboutMessage = message);
}

function getMessage() {
  return aboutMessage;
}

async function getIssues() {
  return getIssuesList();
}

function addIssue(_, { issue }) {
  issue.created = new Date();
  validateIssue(issue);
  return insertIssue(issue);
}

function validateIssue(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be at least 3 characters long.');
  }
  if (issue.status == 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

server.start().then((res) => {
  server.applyMiddleware({ app, path: '/graphql' });
});

mongoose.set('strictQuery', false);
mongoose.connect(URL, { useNewUrlParser: true });

(async function () {
  try {
    // await seedData();
    app.listen(PORT, function () {
      console.log('App started on port 4000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();
