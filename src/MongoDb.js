// npm install mongodb
const MongoDbClient = require('mongodb').MongoClient;
const assert = require('assert');


class MongoDb {
  constructor(url) {
    this.url = url;
  }

  // Use connect method to connect to the Server
  MongoInsert(dateTemp) {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      db.collection('Data').insertMany(dateTemp)
        .then((result) => {
        // process result
        console.log(result);
        });
      assert.equal(null, err);
      clientDb.close();
    });
  }
}

module.exports = MongoDb;
