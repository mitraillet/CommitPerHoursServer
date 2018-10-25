
require('dotenv/config');

const Github = require('./src/Github');
const utils = require('./src/utils');
const utilsMongoDb = require('./src/utilsMongoDb');

const clientGit = new Github({ token: process.env.OAUTH_TOKEN });

let numNextPage = 1;

function setNumNextPage(num) {
  numNextPage = num;
}

// Fill the databases with new data
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

// Check if the data was already in databases if not call filldatabase
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

// Function to temporise worker
function throttleToDo(username, repos) {
  utilsMongoDb.connectToServer((error) => {
    if (error) throw error;
    const db = utilsMongoDb.getDb();
    MongoCheckRepoName(`${username}.${repos}`).then(trueOrFalse => {
      if (trueOrFalse) {
        fillDatabase(username, repos, numNextPage);
      } else {
        db.close();
      }
    });
  });
}

// function execute a the beginning of the script
function worker() {
  throttleToDo('torvalds', 'linux');
  // throttleToDo('gcc-mirror', 'gcc');
  // throttleToDo('mitraillet', 'CommitPerHoursServer');
}

worker();

module.exports = worker;
