
require('dotenv/config');
// npm i lodash.throttle
const throttle = require('lodash.throttle');

const Github = require('./src/Github');
const utils = require('./src/utils');
const utilsMongoDb = require('./src/utilsMongoDb');

const clientGit = new Github({ token: process.env.OAUTH_TOKEN });

let numNextPage = 1;

function setNumNextPage(num) {
  numNextPage = num;
}

function fillDatabase(username, repos, numPage = 1) {
  const db = utilsMongoDb.getDb();
  return clientGit.commit(username, repos, numPage)
    .then(({ date, nextPage }) => {
      setNumNextPage(nextPage);
      return utils.getReposCommitDate(date);
    })
    .then(dates => db.db('CommitPerHour').collection('Data').insertMany(dates)
      .then(() => {
        if (numNextPage) setTimeout(() => { fillDatabase(username, repos, numNextPage); }, 720);
      })
      .catch(err => console.error(err)));
}

function MongoCheckRepoName(repoName) {
  const db = utilsMongoDb.getDb();
  const query = { repoUser: repoName };
  let response = '';
  return db.db('CommitPerHour').collection('RepoName').findOne(query).then(result => {
    if (result) {
      response = result.repoUser;
    }
    if (repoName !== response) {
      db.db('CommitPerHour').collection('RepoName').insertOne(query);
      return true;
    }
    return false;
  });
}

function throttleToDo(username, repos) {
  utilsMongoDb.connectToServer((error) => {
    if (error) throw error;
    const db = utilsMongoDb.getDb();
    MongoCheckRepoName(`${username}.${repos}`).then(trueOrFalse => {
      if (trueOrFalse) {
        fillDatabase(username, repos, numNextPage).then(() => db.close());
      } else {
        db.close();
      }
    });
  });
  // console.error(temp.then(() => { console.error('cc'); }));
  // const throttled = throttle(fillDatabase, 12);
}

function worker() {
  // throttleToDo('torvalds', 'linux');
  // throttleToDo('gcc-mirror', 'gcc');
  // throttleToDo('mitraillet', 'CommitPerHoursServer');
}

worker();

module.exports = worker;
