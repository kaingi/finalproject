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
const PREFIX1 = 'B-';

// Function to generate a new UUID with a prefix
function generateId1() {
  const uuid = uuidv4();
  const id = PREFIX1 + uuid;
  return id;
}
const addNewBuyer = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const addbuyer = {
    Login_id: generateId(), // replace with your own function that generates a unique ID
    login_name: req.body.username,
    login_email: req.body.email,
    login_password: hashedPassword,
    login_roles: "Buyer"
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
    connect.con.query('INSERT INTO login SET ?', addbuyer, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
        return;
      }

      // check user role and store it in a different table
      if (addbuyer.login_roles === 'Buyer') {
        const buyerData = {
          Buyer_id:generateId1(),
          Buyer_name: req.body.username,
          Buyer_phone_no: req.body.number,
          Buyer_email: req.body.email,
          Buyer_login_id: addbuyer.Login_id
        };
        connect.con.query('INSERT INTO buyer SET ?', buyerData, (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating cooperative' });
            return;
          }
          res.status(200).send('User signed up and cooperative created successfully');
        });
      } 
    });
  }); 
};


const getAllBuyer = (req, res) => {
  const query = 'SELECT * FROM buyer';
  connect.con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
}

  
  module.exports = {
    addNewBuyer,
    getAllBuyer
  }