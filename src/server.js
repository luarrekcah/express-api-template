const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

const indexRouter = require('./routes/index');

const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req,res,next)=>{
  const host = req.get('host');
  if(host === 'localhost:3000') {
    next();
  } else {
    return res.sendStatus(401)
  }
});

app.use('/', indexRouter);

app.use(errorHandler);

require("./database/setup");

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log(`PORTA: ${listener.address().port}`);
});

module.exports = app;