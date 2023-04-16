const mysql2 = require('mysql');


const con = mysql2.createConnection({  
  host: "localhost",  
  user: "root",
  database:"biddingsystemdb",  
  password: ""  
});  



module.exports = {con}