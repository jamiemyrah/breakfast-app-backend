// const express = require("express");
// const router = express.Router();
// const {  getContacts,
//     deleteContact,
//     getContact,
//     updateContact,
//     createContact,
    
// } = require("../controllers/userController");

// router.route("/").get(getContacts);

// router.route("/:id").get(getContact);
// app.get('', (req, res) => {
//     pool.getConnection((err,connection) =>{
//         if (err)
//         console.log(`connected as id ${connection.threadId}`)

//         connection.query('SELECTED * from breakfast', (err, rows) => {
//             connection.release() //return the connection to pool
          
//             if (!err) {
//                 res.send(rows)
//             } else {
//                 console.log(err)
//             }
//         })

//  })   
// }) 
  
// router.route("/").post(createContact); 

// router.route("/:id").put(updateContact); 

// router.route("/:id").delete( deleteContact); 


// module.exports = router;