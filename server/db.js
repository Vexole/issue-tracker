const { MongoClient } = require('mongodb');

const URL =
  'mongodb+srv://bshrestha:03Md5BsmF2IiCGO9@cluster0.fm67amd.mongodb.net/issues';

let db;

async function connectDB() {
  const client = new MongoClient(URL, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db();
}

function getDBConnection() {
  if (!db) {
    connectDB();
  }
  return db;
}

async function getIssues() {
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}
