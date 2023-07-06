 const executeQuery = require("../database-utils/create-database");
// const bcrypt = require("bcrypt");
 const sendRegistrationEmail = require("../app");
const nodemailer = require("nodemailer");
module.exports = {
  //logouy user
  async logout(req, res, next) {
    try {
      // Clear the user session or token here
      // Example: req.session.user = null;
      res.send({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to logout user", error: error.message });
    }
  },
  // verification
  async sendRegistrationEmail(email, username) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "shaban.asiimwe.upti@gmail.com",
        pass: "gxlarmcejxpviwyc",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: "shaban.asiimwe.upti@gmail.com",
      to: email,
      subject: "User Registration",
      text: `Dear ${username},\n\nYou have been registered as a user by an admin.\n\nBest regards,\nThe Admin`,
    };
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error("Failed to send registration email:", error);
          reject(error);
        } else {
          console.log("Registration email sent: " + info.response);
          resolve();
        }
      });
    });
  },
  // end of verification
  async register(req, res, next) {
    console.log('sent')
    try {
      const email = req.body.email;
      const name = req.body.name;
      const company = req.body.company;
      const userType = req.body.userType;
      // Check if email already exists
      const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
      const existingUser = await executeQuery(checkEmailQuery, [email]);
      if (existingUser.length > 0) {
        // Email already exists
        return res.status(400).send({ error: "User already exists" });
      }
      // Email doesn't exist, proceed with registration
      const insertUserQuery =
        "INSERT INTO users (company, userType, name, email, joiningDate) VALUES (?, ?, ?, ?)";
      await executeQuery(insertUserQuery, [company, userType, name, email]);
      // Send registration email
      await this.sendRegistrationEmail(email, username);
      res.send({
        message: "User registered successfully. Verification email sent.",
      });
      console.log("sucessful")
    } catch (error) {
      console.log('this an erroooooooooor',error);
      console.error(error);
      res.status(500).send({
        error: error.message,
      });
    }
  },
  // Login controller
  async login(req, res, next) {
    try {
      const email = req.body.email;
      const password = req.body.password;
      // Check if user exists in the database
      const checkUserQuery = "SELECT * FROM users WHERE email = ?";
      const existingUser = await executeQuery(checkUserQuery, [email]);
      if (existingUser.length === 0) {
        // User does not exist, return an error message
        return res.status(401).send({ message: "User does not exist" });
      }
      const user = existingUser[0];
      if (user.password === password) {
        // Password matches, user is logged in successfully
        res.send({ message: "User logged in successfully", user });
      } else {
        // Invalid password
        res.status(401).send({ message: "Invalid password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Wrong password/username or user doesnot exist",
        error: error.message,
      });
    }
  },
  // getAllUsers
  async getAllUsers(req, res, next) {
    console.log('hello world')
    try {
      const getUsersQuery = "SELECT * FROM users";
      const users = await executeQuery(getUsersQuery);
      res.send(users);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to fetch users", error: error.message });
    }
  },
  // deleteUser
  async deleteUser(req, res, next) {
    try {
      const userId = req.params.id;
      // Your logic to delete the user from the database
      const deleteQuery = `DELETE FROM users WHERE id = ${userId}`;
      await executeQuery(deleteQuery);
      res.send({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to delete user", error: error.message });
    }
  },
  // Activate a user
  async activateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const activateUserQuery = `
      UPDATE users
      SET status = 'active'
      WHERE id = ?
    `;
      // await executeQuery(activateUserQuery, [userId]);
      res.send({ message: "User activated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to activate user", error: error.message });
    }
  },
  // Deactivate a user
  async deactivateUser(req, res, next) {
    try {
      const userId = req.params.id;
      const deactivateUserQuery = `
      UPDATE users
      SET status = 'inactive'
      WHERE id = ?
    `;
      await executeQuery(deactivateUserQuery, [userId]);
      res.send({ message: "User deactivated successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Failed to deactivate user", error: error.message });
    }
  },
}
