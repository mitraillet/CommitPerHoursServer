const { expect } = require('chai');
const utils = require('../src/utils');

describe('my express app tests extract the date and format it', () => {
  // Useless test, remove it and code your own tests here.
  it('should return { date: the date}', () => {
    const JSON1 = { commit: { author: { date: '2018-10-23T18:54:16Z' } } };
    const JSON2 = { commit: { author: { date: '2017-01-10T05:40:59Z' } } };
    const JSON3 = { commit: { author: { date: '2016-08-31T23:05:00Z' } } };
    expect(utils.getDate(JSON1)).to.eql({ date: '2018-10-23T18:54:16Z' });
    expect(utils.getDate(JSON2)).to.eql({ date: '2017-01-10T05:40:59Z' });
    expect(utils.getDate(JSON3)).to.eql({ date: '2016-08-31T23:05:00Z' });
  });
});

describe('my express app tests extract the date from commit and format it', () => {
  // Useless test, remove it and code your own tests here.
  it('should return { date: the date}', () => {
    const COMMIT1 = {
      sha: 'bd6bf7c10484f026505814b690104cdef27ed460',
      node_id: 'MDY6Q29tbWl0MjMyNTI5ODpiZDZiZjdjMTA0ODRmMDI2NTA1ODE0YjY5MDEwNGNkZWYyN2VkNDYw',
      commit: {
        author: {
          name: 'Linus Torvalds',
          email: 'torvalds@linux-foundation.org',
          date: '2018-10-25T13:50:48Z',
        },
        committer: {
          name: 'Linus Torvalds',
          email: 'torvalds@linux-foundation.org',
          date: '2018-10-25T13:50:48Z',
        },
        tree: {
          sha: '0ff42aa1dae7f7e28a5de5a74bfea641cae0841c',
          url: 'https://api.github.com/repos/torvalds/linux/git/trees/0ff42aa1dae7f7e28a5de5a74bfea641cae0841c',
        },
      },
    };
    expect(utils.getDate(COMMIT1)).to.eql({ date: '2018-10-25T13:50:48Z' });
  });
});

/* Unpossible test cause I can't recreate an header from GitHub API REST
 describe('my express app tests extract the date and format it', () => {
  // Useless test, remove it and code your own tests here.
  it('should return { date: the date}', () => {
    const header = { headers: { Link: '<https://api.github.com/repositories/2325298/commits?page=2&per_page=1>; rel="next", <https://api.github.com/repositories/2325298/commits?page=788822&per_page=1>; rel="last"'}};    
    expect(utils.getNextPage(header)).to.eql(2);
  });
}); */
