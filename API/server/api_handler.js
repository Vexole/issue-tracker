const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const GraphQLDate = require('./graphql_date');
const { setAboutMessage, getMessage } = require('./about');
const { getIssues, addIssue } = require('./issue');

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

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

function installHandler(app) {
  server.start().then(() => {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
  });
}

module.exports = { installHandler };
