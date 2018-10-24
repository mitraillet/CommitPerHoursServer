require('dotenv/config');
const MongoDbClient = require('mongodb').MongoClient;

let _db;

module.exports = {

  connectToServer: (callback) => {
    MongoDbClient.connect(process.env.urlMongoDb, (err, db) => {
      _db = db;
      return callback(err);
    });
  },

  getDb: () => {
    return _db;
  },
};
