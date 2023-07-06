const env = require('dotenv');
env.config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require("mysql2")
const logger = require('morgan');
// const indexRouter = require('./routes/index');
const catRouter = require('./routes/Cat');
const createError = require("http-errors");
const adminRouter = require("./routes/admin");
//const Restrictions = require("./middleWares/Restrictions");
const ordersRouter = require("./routes/Orders");
const orderRouter = require("./routes/Order");


const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))


const pool = mysql.createPool({
  connectionLimit: 10,
   host:   'localhost',
   user:    'jamirah',
   password: 'kityo',
     database: 'odyssey'
})
 
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());



app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', indexRouter);
app.use('/Cat', catRouter);
app.use('/', adminRouter);
//app.use('/', Restrictions);
app.use('/Orders', ordersRouter);
app.use('/Order', orderRouter);

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;










// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
//app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });


// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'jamirah.nakkungu.upti@gmail.com',
//     pass: 'liyyalyldwrdudcv'
//   }
// });

// const mailOptions = {
//   from: 'jamirah.nakkungu.upti@gmail.com',
//   to: 'shaban.asiimwe.upti@gmail.com',
//   subject: 'Subject',
//   text: 'Gwe fala'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//  console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//     // do something useful
//   }
// });


app.listen(5001, () => {
  console.log('App listening on port 5001');
});

module.exports = app;
