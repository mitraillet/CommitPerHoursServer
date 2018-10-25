require('dotenv/config');
const MongoDbClient = require('mongodb').MongoClient;

let constDb;

module.exports = {

  connectToServer: (callback) => {
    MongoDbClient.connect(process.env.urlMongoDb, (err, db) => {
      constDb = db;
      return callback(err);
    });
  },

  getDb: () => {
    return constDb;
  },
};
