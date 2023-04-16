const bcrypt = require('bcrypt');
const connect = require('../config/dbcon');


const jwt = require('jsonwebtoken');
require('dotenv').config()
const fsPromises = require('fs').promises;

const handleLogin = async (req, res) => {
  const userEmail = req.body.userEmail;
  const password = req.body.password;

  try {
    // Query the database to find the user by email
    const query = `SELECT * FROM Login WHERE Login_email = '${userEmail}'`;
    connect.con.query(query, async function (error, results) {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while querying the database.' });
        return;
      }
      if (results.length === 0) {
        res.status(401).json({ message: 'Invalid email or password.' });
        return;
      }
      const foundUser = results[0];
      const match = await bcrypt.compare(password, foundUser.login_password);
      if (match) {
        // create JWTs
        const accessToken = jwt.sign(
          { "userEmail": foundUser.email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
          { "userEmail": foundUser.email },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        ); 
          // Send a success response
          res.cookie("accessToken",accessToken,"refreshToken",refreshToken,{maxAge: 1000*60,httpOnly:true})
          res.json({ 'success': `User ${userEmail} is logged in!` ,accessToken, refreshToken,user:foundUser});
  
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};



module.exports = { handleLogin};
