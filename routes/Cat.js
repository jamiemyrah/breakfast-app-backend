var express = require('express');
var router = express.Router();
const client = require('../database-utils/connect-to-database');
const catController = require('../controllers/Cat')

/* GET users listing. */
router.get('/', async function(req, res, next) {
 // const result = await client.querry('SELECT * FROM breakfast')
  return res.send({
    users: result.rows,
    count: result.rowCount
  });
});

router.get('', (req, res) => {
     res.render('')
      })
  //get all breakfast
  router.get('/', (req, res) => {
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
  //get one breakfast by id
  router.get('/:id', (req, res) => {
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
  // // delete a member
  router.delete('/:id', (req, res) => {
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
  // // add a request
  router.post('', (req, res) => {
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
router.put('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(`connected as id ${connection.threadId}`)
    const { id, company, name, email } = req.body
    connection.query('UPDATE breakfast SET  company= ?, name= ?, email=?,userType=?, joiningDate WHERE id = ?', [name, id, email, company]
      , (err, rows) => {
        connection.release() //return the connection to pool
        if (!err) {
          res.send(`member with the name: ${name} has been updated.`)
        } else {
          console.log(err)
        }
      })
    console.log(req.body)
  })
});


// router.post('/createtable', [], usersController.createTable)

module.exports = router;


          
      