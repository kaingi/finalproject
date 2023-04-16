const connect = require('../config/dbcon');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const PREFIX = 'L-';

// Function to generate a new UUID with a prefix
function generateId() {
  const uuid = uuidv4();
  const id = PREFIX + uuid;
  return id;
}
const PREFIX1 = 'F-';

// Function to generate a new UUID with a prefix
function generateId1() {
  const uuid = uuidv4();
  const id = PREFIX1 + uuid;
  return id;
}
const addNewFarmer = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const addFarmer = {
    Login_id: generateId(),
    login_name: req.body.username,
    login_email: req.body.email,
    login_password: hashedPassword,
    login_roles: "Farmer"
  };
  
  connect.con.query('SELECT * FROM login WHERE login_email = ?', [req.body.email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error checking user email' });
      return;
    }
    if (results.length > 0) {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }
    connect.con.query('INSERT INTO login SET ?', addFarmer, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
        return;
      }
        // check user role and store it in a different table
      if (addFarmer.login_roles === 'Farmer') {
        const FarmerData = {
          Farmer_id:generateId1(),
          Farmer_name: req.body.username,
          Farmer_phone_no: req.body.number,
          Farmer_email: req.body.email,
          Farmer_login_id: addFarmer.Login_id
        };
        connect.con.query('INSERT INTO farmer SET ?', FarmerData, (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating cooperative' });
            return;
          }
        });
      } 
        res.status(200).send('User signed up and cooperative created successfully');

      } 
    );
  }); 
};

module.exports = {
    addNewFarmer
  }