import mongoose from "mongoose"
mongoose.Promise = require('bluebird')
import createError from 'http-errors'
import express from 'express'
import {
  join
} from 'path';
import cookieParser from 'cookie-parser'
import logger from 'morgan'
//导入controllers
import index from "./controllers/index"
import users from "./controllers/users"

//connect to mongodb
mongoose.connect(process.env.MONGO_URL, {
    useMongoClient: true
  })
  .then(() => console.log("Connection has been made!"))
  .catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
  });

const app = express();

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
//设置controllers,要放在bodyParse的下面，因为用到了这个中间件
index.controller(app)
users.controller(app)

app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000")
})

export default app;