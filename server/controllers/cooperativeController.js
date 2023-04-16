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
const PREFIX1 = 'C-';

// Function to generate a new UUID with a prefix
function generateId1() {
  const uuid = uuidv4();
  const id = PREFIX1 + uuid;
  return id;
}
const addNewCooperative = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const addCooperative = {
    Login_id: generateId(), // replace with your own function that generates a unique ID
    login_name: req.body.username,
    login_email: req.body.email,
    login_password: hashedPassword,
    login_roles: "cooperative"
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
    connect.con.query('INSERT INTO login SET ?', addCooperative, (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating user' });
        return;
      }

      // check user role and store it in a different table
      if (addCooperative.login_roles === 'cooperative') {
        const cooperativeData = {
          Coooperative_id:generateId1(),
          Coooperative_Name: req.body.username,
          Coooperative_Mobile: req.body.number,
          Coooperative_email: req.body.email,
          Coooperative_login_id: addCooperative.Login_id
        };
        connect.con.query('INSERT INTO Coooperative SET ?', cooperativeData, (error, results) => {
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


const getCooperative = (req, res) => {
  const query = 'SELECT * FROM coooperative';
  connect.con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
};

  
  module.exports = {
    addNewCooperative,
    getCooperative
  }