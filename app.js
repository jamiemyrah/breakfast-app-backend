require("dotenv").config();
const express = require("express");
const nodemailer = require('nodemailer');
//const logger = require('morgan');
//const path = require('path');
const bodyParser = require('body-parser');
//const exphbs = require(express-handlebars)
 //const errorHandler = require("./middleWares/errorHandler");
const mysql = require('mysql');
const cors = require("cors");
const app = express();
app.use(cors());

const port = process.env.PORT || 5001;
app.use(express.static('public'));
//app.engine('hbs', exphbs({ extname: '.hbs' }));

//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//app.use(logger("dev"));
//app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// app.use("/api/contacts", require("./routes/contactRoutes"));
//app.use(errorHandler);

//mysql2
   const pool = mysql.createPool({
    connectionLimit: 10, 
    host:   'localhost',
    user:    'jamirah',
    password: 'kityo',
       database: 'odyssey'
     

   })
 
// app.get('', (req, res) => {
//      res.render('')
//    })

//get all breakfast
app.get('', (req, res) => {
    pool.getConnection((err,connection) =>{
         if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        
        connection.query('SELECT * FROM breakfast ', (err, rows) => {
            connection.release() //return the connection to pool
          
             if (!err) {
                 res.send(rows)
             } else {
               console.log(err)
             }
         })

  })   
 })

//get breakfast by id
app.get('/:id', (req, res) => {
    pool.getConnection((err,connection) =>{
         if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        
        connection.query('SELECT * FROM breakfast WHERE id=?',[req.params.id], (err, rows) => {
            connection.release() //return the connection to pool
          
             if (!err) {
                 res.send(rows)
             } else {
               console.log(err)
             }
         })

  })   
})
 
// delete a member
app.delete('/:id', (req, res) => {
    pool.getConnection((err,connection) =>{
         if (err) throw err
        console.log(`connected as id ${connection.threadId}`)
        
        connection.query('DELETE FROM breakfast WHERE id=?',[req.params.id], (err, rows) => {
            connection.release() //return the connection to pool
          
             if (!err) {
                 res.send(`member with id:${[req.params.id]} has been removed.` )
             } else {
               console.log(err)
             }
         })

  })   
})

// add a request
app.post('', (req, res) => {
    pool.getConnection((err,connection) =>{
         if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

        const params = req.body
        
        connection.query('INSERT INTO breakfast SET ?',params , (err, rows) => {
            connection.release() //return the connection to pool
          
             if (!err) {
                 res.send(`member with the name: ${params.name} has been added.` )
             } else {
               console.log(err)
             }
        })
        console.log(req.body)

  })   
})
// update a record
app.put('', (req, res) => {
    pool.getConnection((err,connection) =>{
         if (err) throw err
        console.log(`connected as id ${connection.threadId}`)

    
        const {id, company, name, email, product, amount, balance} = req.body
        
      connection.query('UPDATE breakfast SET name= ?, email=?, WHERE id = ?', [name, id, email, company, product, amount, balance]
        , (err, rows) => {
            connection.release() //return the connection to pool
          
             if (!err) {
                 res.send(`member with the name: ${name} has been updated.` )
             } else {
               console.log(err)
             }
        })
        console.log(req.body)

  })   
})

// const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jamirah.nakkungu.upti@gmail.com',
    pass: 'liyyalyldwrdudcv'
  }
});

const mailOptions = {
  from: 'jamirah.nakkungu.upti@gmail.com',
  to: 'shaban.asiimwe.upti@gmail.com',
  subject: 'Subject',
  text: 'Gwe fala'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})