const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');
const serverConfig = require('./config');
const authConfig = require('./auth');
const passport = require('passport');
const bodyParser = require('body-parser');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const MONGODB_URI = isDeveloping ? serverConfig.database.local : serverConfig.database.prod; 


const app = express();


/**
 * Use Body Parser 
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/**
 * Setup webpack as frontend
 */
if (isDeveloping) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'client',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
}


/**
 * Load the frontend app
 */
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', function response(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});


/**
 * Connect to database
 */

mongoose.connect(MONGODB_URI, {
  useMongoClient: true
});

mongoose.connection.on('error', function () {
  // TODO set up a logger
    console.log('Mongoose connection error');
});

mongoose.connection.once('open', function callback() {
    console.log("Mongoose connected to the database");
});
mongoose.Promise = global.Promise;


/**
 * Add auth using passport
 */
app.use(passport.initialize());
authConfig(passport);


/**
 * Load our api
 */
var router = express.Router();
router.use(function(req, res, next) {
    // This logs requests to the server to the console (debug)
    console.log(req.method, "api" + req.url);
    next();
});
require('./api/users')(router);
app.use('/api', router);



/**
 * Run the server
 */
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
