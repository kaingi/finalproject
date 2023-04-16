const connect = require('../config/dbcon');
 
 const ValidateUser = (req, res) => {
  const { userEmail, password } = req.body;
  
  // Query the MySQL database to get the user with the given username
  connect.con.query('SELECT * FROM login WHERE login_email = ?', [userEmail], (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      if (results.length === 0) {
        res.json({ success: false });
      } else {
        // Compare the password hash with the provided password
        const user = results[0];
        ('SELECT * FROM login WHERE login_password = ?', [password], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
          } else if (result) {
            res.json({ success: true });
          } else {
            res.json({ success: false });
          }
        });
      }
    }
  });
};

module.exports ={
  ValidateUser
}