// loads environment variables
require('dotenv/config');
const express = require('express');
const cors = require('cors');
const Github = require('./src/Github');
const utils = require('./src/utils');
const utilsMongoDb = require('./src/utilsMongoDb');
const worker = require('./worker');

const app = express();
const port = process.env.PORT || 3000;
const client = new Github({ token: process.env.OAUTH_TOKEN });

// Enable CORS for the client app
app.use(cors());

app.get('/repos/:username/:repos/commits', (req, res, next) => {
  client.commit(req.params.username, req.params.repos)
    .then(({ date }) => { return utils.getReposCommitDate(date); })
    .then(dates => res.send(dates))
    .then(() => worker.throttleToDo(req.params.username, req.params.repos))
    .catch(next);
});

app.get('/dates', (req, res, next) => {
  utilsMongoDb.connectToServer((error) => {
    if (error) next(error);
    const db = utilsMongoDb.getDb();
    db.db('CommitPerHour').collection('Data').find({}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
      db.close();
    });
  });
});


// Forward 404 to error handler
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening at http://localhost:${port}`);
});
