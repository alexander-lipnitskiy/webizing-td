const createError = require('http-errors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');

const schema = require('./graphql/schema');
const root = require('./graphql/api');

const indexRouter = require('./routes/index');
const textileRouter = require('./routes/textile');

// Thing Description Routes
const airQuality= require('./routes/td/air-quality');
const cushion = require('./routes/td/cushion');
const energyApplianceMonitor = require('./routes/td/energy-appliance-monitor');
const energyMonitor = require('./routes/td/energy-monitor');
const ipCamera = require('./routes/td/ip-camera');
const ipfsCamera = require('./routes/td/ipfs-camera');
const sleep = require('./routes/td/sleep');
const smartTable = require('./routes/td/smart-table');
const smartWatch = require('./routes/td/smart-watch');
const thing = require('./routes/td-manager');

const smartWatchRouter = require('./routes/smart-watch');

const pinningRouter = require('./routes/pinning/cameras');
const tdManager = require('./routes/td-manager');

const app = express();
const cors = require('cors');

// const passport = require('passport');
// const Strategy = require('passport-http-bearer').Strategy;

// const jwt = require("express-jwt");
// const jwksRsa = require("jwks-rsa");

const db = require('./db/users');

// const authConfig = {
//   domain: "psy-tests.auth0.com",
//   audience: "https://your-url-endpoint.com"
// };

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
//   }),

//   audience: authConfig.audience,
//   issuer: `https://${authConfig.domain}/`,
//   algorithms: ["RS256"]
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// app.get('/login',
//   passport.authenticate('bearer', { session: false }),
//   function(req, res) {
//     res.json({ username: req.user.username, email: req.user.emails[0].value });
//   });

app.use('/td-manager', tdManager);
app.use('/pinning', pinningRouter);
app.use('/textile', textileRouter);
app.use('/td', indexRouter);
app.use('/airquality/model', airQuality);
app.use('/td/cushion', cushion);
app.use('/td/energyApplianceMonitor', energyApplianceMonitor);
app.use('/td/energyMonitor', energyMonitor);
app.use('/td/ipCamera', ipCamera);
app.use('/td/ipfsCamera', ipfsCamera);
app.use('/td/sleep', sleep);
app.use('/td/smartTable', smartTable);
app.use('/td/smartWatch', smartWatch);
app.use('/mg', smartWatchRouter);

app.use('/thing', thing);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(4000, '0.0.0.0',  async () => {
  console.log('Server running on port 4000');
});

module.exports = app;
