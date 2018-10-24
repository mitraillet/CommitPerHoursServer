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
    if (repoName !== response) {
      MongoDbClient.connect(this.url, (err, clientDb) => {
        const db = clientDb.db('CommitPerHour');
        const query = { repoUser: repoName };
        db.collection('RepoName').insertOne(query);
        assert.equal(null, err);
        clientDb.close();
        return true;
      });
    }
    return false;
  }

  // Function check if repoName already be had or not to the DB and call MongoInsertRepoName
  MongoCheckRepoName(repoName) {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      const query = { repoUser: repoName };
      let response = '';
      const retour = db.collection('RepoName').findOne(query).then(result => {
        if (result) {
          response = result.repoUser;
          console.error(response);
        }
        return this.MongoInsertRepoName(repoName, response);
      }).then(func => { console.error(func); return func; })
        .catch(error => console.error(error));
      assert.equal(null, err);
      clientDb.close();
      console.error(retour);
      return retour;
    });
  }

  MongoExtractAllDate() {
    MongoDbClient.connect(this.url, (err, clientDb) => {
      const db = clientDb.db('CommitPerHour');
      db.collection('Data').find({}).toArray((error, results) => { console.error(error); console.error(results); });
      assert.equal(null, err);
      clientDb.close();
    });
  }
}

module.exports = MongoDb;
