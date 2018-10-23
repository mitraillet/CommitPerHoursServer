// npm install parse-link-header
const parse = require('parse-link-header');

// function take commit and return date and hours
function getDate(item) {
  const commitDate = item.commit.author.date;
  return commitDate;
}

// function take all commits to map them and return dates and hours
function getReposCommitDate(commits) {
  const dates = commits.date.map(getDate);
  return dates;
}

function getNextPage(header) {
  const headerLink = header.headers.get('Link');
  const numNextPage = parse(headerLink).next.page;
  return numNextPage;
}

module.exports = {
  getReposCommitDate,
  getNextPage,
};
