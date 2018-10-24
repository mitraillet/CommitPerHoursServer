// npm install mongodb
const MongoDbClient = require('mongodb').MongoClient;
const assert = require('assert');


class MongoDb {
  constructor(url) {
    this.url = url;
  }

  // Function insert all the date in Db
  MongoInsertDate(dateTemp) {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      db.collection('Data').insertMany(dateTemp);
      assert.equal(null, err);
      clientDb.close();
    });
  }

  // Function check if repoName and response is the same and if not add it to db
  MongoInsertRepoName(repoName, response) {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      const query = { repoUser: repoName };
      if (repoName !== response) {
        console.error('merde');
        db.collection('RepoName').insertOne(query);
        assert.equal(null, err);
      }
      assert.equal(null, err);
      clientDb.close();
    });
  }

  // Function check if repoName already be had or not to the DB and call MongoInsertRepoName
  MongoCheckRepoName(repoName) {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      const query = { repoUser: repoName };
      let response = '';
      db.collection('RepoName').find(query).toArray((error, result) => {
        if (error) throw error;
        if (result.length) {
          response = result[0].repoUser;
        }
        this.MongoInsertRepoName(repoName, response);
      });
      assert.equal(null, err);
      clientDb.close();
    });
  }
}

module.exports = MongoDb;
