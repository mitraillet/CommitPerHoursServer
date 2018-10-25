# ga-server
Github Analytics server

## Running the app

### 1. Clone this repo

```sh
$ git clone https://github.com/heig-vd-tweb/express-server-skeleton.git
```

### 2. Add Environment Variables
Copy the `.env.default` file and rename it to `.env`.
```sh
$ cp .env.default .env
```

then edit the `OAUTH_TOKEN` environment variable. You can use your github personal access token which you can find in [Github developer settings](https://github.com/settings/tokens)
and edit `url` of the database  for that you need to either install locally a mongoDB on your computer then the url should be like this `mongodb://localhost:27017/userdir` or you can use a cloud such as mongoDB.atlas and the url should be like this `mongodb+srv://$[username]:$[password]@$[hostlist]/$[database]?retryWrites=true` follow this tutorial to make it `https://docs.mongodb.com/guides/cloud/atlas/`.
In these MongoDB you need to have a database named `TwebCommitPerHours` with two collections named `Data` and `RepoName`. If you don't create this database and collections or you don't want to use this name, you'll need to modify your code to adapt it to fit with your configuration.

### 3. Install project dependencies
```sh
$ npm install
```
### 4. Run the app

You can start the server by running
```$
$ npm start
```

or you can start the server in development mode. This command uses [nodemon](https://github.com/remy/nodemon) to watch changes in your code and automatically restart the server.
```sh
$ npm run dev
```

Finally, use `npm test` to run tests.

### 5. Run the worker

You can start the worker by running 
```$
$ node worker
```

but all the calling function in this worker are commented to avoid running useless function and you can add "manually" the repo that you want to mongoDB by uncommented this ``` throttleToDo('username', 'reponame');``` and changing the username and the reponame by the repo and the user that you want.

### 6. A little thing to know

When you check the date for one repo by going on `$url/repos/$user/$repos/commits` when the app is running automatically you fill the database with all the commit's dates of this repo.