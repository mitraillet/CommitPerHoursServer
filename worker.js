
require('dotenv/config');
// npm i lodash.throttle
const throttle = require('lodash.throttle');

const MongoDb = require('./src/MongoDb');
const Github = require('./src/Github');
const utils = require('./src/utils');

const clientGit = new Github({ token: process.env.OAUTH_TOKEN });
const clientMongoDb = new MongoDb(process.env.urlMongoDb);

let numNextPage = 1;

function setNumNextPage(num) {
  numNextPage = num;
}

function fillDatabase(username, repos, numPage = 1) {
  clientGit.commit(username, repos, numPage)
    .then(({ date, nextPage }) => {
      setNumNextPage(nextPage);
      return utils.getReposCommitDate(date);
    })
    .then(dates => clientMongoDb.MongoInsertDate(dates))
    .then(() => {
      if (numNextPage) setTimeout(() => { fillDatabase(username, repos, numNextPage); }, 12);
    })
    .catch(err => console.error(err));
}

function throttleToDo(username, repos) {
  if (!clientMongoDb.MongoCheckRepoName(`${username}.${repos}`)) {
    console.error('connard2');
  }
  // const throttled = throttle(fillDatabase, 12);
  // throttled(username, repos, numNextPage);
}

function worker() {
  throttleToDo('AdrienNini', 'ProjetAdmin');
  // throttleToDo('gcc-mirror', 'gcc');
}

worker();

module.exports = worker;
