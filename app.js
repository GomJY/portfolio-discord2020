const express = require("express");
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const port = 5901;

const app = express();

//$$routingSetting
const index_rt = require('./routes/index'); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', port || 3000);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
// app.use(session());

//$$routingGroup middle ware add
app.use('/', index_rt);

app.use((req, res, next) => {
  const err = new Error("!!!NotFound");
  err.status = 404;
  res.status(404).render('NotFound');
});

//error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('notfound');
});

app.listen(app.get('port'), () => {
  console.log(`${app.get('port')}번 포트에서 서버가 시작되었습니다.`);
});