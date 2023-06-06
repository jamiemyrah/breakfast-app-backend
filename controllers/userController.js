//const asyncHandler = require("express-async-handler");
//@desc get all contacts
//@route GET/api/contact/:id
//@access public
// const getContact = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: `get a member  ${req.params.id}` })
// });

//@desc create all contacts
//@route GET/api/contact/
//@access public
// const getContacts = asyncHandler(async (req, res) => {
//     res.status(201).json({ message: "Get all members" })
// });

//@desc create all contacts
//@route POST/api/contact
//@access public
// const createContact = asyncHandler(async (req, res) => {
//     console.log("The request body is :", req.body)
//     const { name, email, company } = req.body;
//     if (!name || !email || !company) {
//         res.status(400);
//         throw new Error("All members are mandatory !");
//     }
//     res.status(201).json({ message: "Get all group members" })
// });

//@desc create all contacts
//@route PUT/api/contact/:id
//@access public
// const updateContact = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: `update a member  ${req.params.id}` })
// });

//@desc create all contacts
//@route DELETE/api/contact/:id
//@access public
// const deleteContact = asyncHandler(async (req, res) => {
//     res.status(200).json({ message: `delete a member  ${req.params.id}` })
// });



// module.exports = {
//     getContacts,
//     deleteContact,
//     updateContact,
//     createContact,
//     getContact
// }