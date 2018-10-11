function getDate(item) {
  const commitDate = item.commit.author.date;
  return commitDate;
}

function getReposCommitDate(commits) {
  const dates = commits.map(getDate);
  return dates;
}


module.exports = {
  getReposCommitDate,
};
