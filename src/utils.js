const parse = require('parse-link-header');

let numLastPage;

function getDate(item) {
  const commitDate = item.commit.author.date;
  return commitDate;
}

function getReposCommitDate(commits) {
  const dates = commits.map(getDate);
  return dates;
}

function setLastPage(header) {
  const headerLink = header.headers.get('Link');
  numLastPage = parse(headerLink).last.page;
  console.log(numLastPage);
}

module.exports = {
  getReposCommitDate,
  setLastPage,
};
