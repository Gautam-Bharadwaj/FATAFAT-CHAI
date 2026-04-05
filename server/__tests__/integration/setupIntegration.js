const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

let mongod;

async function connectTestDb() {
  process.env.JWT_SECRET = 'integration-test-secret';
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
}

async function disconnectTestDb() {
  await mongoose.disconnect();
  if (mongod) {
    await mongod.stop();
  }
}

async function clearCollections() {
  const { collections } = mongoose.connection;
  await Promise.all(
    Object.values(collections).map((collection) => collection.deleteMany({}))
  );
}

module.exports = {
  connectTestDb,
  disconnectTestDb,
  clearCollections,
};
