// npm install parse-link-header
const parse = require('parse-link-header');

// const utilsMongoDb = require('./utilsMongoDb');

// function take commit and return date and hours
function getDate(item) {
  const commitDate = { date: item.commit.author.date };
  return commitDate;
}

// function take all commits to map them and return dates and hours
function getReposCommitDate(commits) {
  const dates = commits.map(getDate);
  return dates;
}

// function to got the next page by the header
function getNextPage(header) {
  const headerLink = header.headers.get('Link');
  const numNextPage = parse(headerLink).next.page;
  return numNextPage;
}

module.exports = {
  getReposCommitDate,
  getNextPage,
  getDate,
};
