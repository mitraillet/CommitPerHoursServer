// npm install mongodb
const MongoDbClient = require('mongodb').MongoClient;
const assert = require('assert');


class MongoDb {
  constructor(url) {
    this.url = url;
  }

  // Use connect method to connect to the Server
  MongoInsertDate(dateTemp) {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      db.collection('Data').insertMany(dateTemp);
      assert.equal(null, err);
      clientDb.close();
    });
  }

  /*
  MongoInsertRepoName(repoName) {
    let bool = false;
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      const query = { repoUser: repoName };
      let response = '';
      db.collection('customers').find(query).toArray((error, result) => {
        if (error) throw error;
        response = result[0].repoUser;
      });
      if (repoName !== response) {
        db.collection('RepoName').insertOne(query);
        bool = true;
      }
      assert.equal(null, err);
      clientDb.close();
    });
    return bool;
  } */
}

module.exports = MongoDb;
