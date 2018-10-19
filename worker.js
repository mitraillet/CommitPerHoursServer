
require('dotenv/config');
// npm i lodash.throttle
const _ = require('lodash.throttle');

const Github = require('./src/Github');
const utils = require('./src/utils');

const client = new Github({ token: process.env.OAUTH_TOKEN });

let numNextPage = 1;

function setNumNextPage(num) {
  numNextPage = num;
}

// TODO Ask to Miguel or Paul
function worker(username, repos, numPage = 1) {
  client.commit(username, repos, numPage)
    .then(({ date, nextPage }) => {
      setNumNextPage(nextPage);
      return utils.getReposCommitDate(date);
    })
    .then(dates => console.log(dates));
}

function throttleToDo(username, repos) {
  while (numNextPage) _.throttle(worker(username, repos, numNextPage), 12);
  return true;
}

module.exports = {
  worker,
  throttleToDo,
};
