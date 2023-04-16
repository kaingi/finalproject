const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const cors = require('cors');
const connect = require('./config/dbcon');
const currentDate = new Date();
const fileUpload = require("express-fileupload");
require('dotenv').config()


const { v4: uuidv4 } = require('uuid');
const PREFIX = 'P-';

// Function to generate a new UUID with a prefix
function generateId() {
  const uuid = uuidv4();
  const id = PREFIX + uuid;
  return id;
}
const jwt =require("jsonwebtoken")
/* const filesPayloadExists = require('./middleware/filePayloadExists')
const fileiExtLimiter = require('./middleware/fileExtLimiter')
const fileSizeLimiter = require('./middleware/fileSizeLimiter') */


const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;

// Serve Static Files
app.use(express.static('uploads'));

// use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods:['GET','POST','DELETE','PUT'],
    credentials: true
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static('files'));


app.post("/user/authenticate",(req,res)=>{

  console.log(req.body)

  jwt.verify(req.body.token,  process.env.ACCESS_TOKEN_SECRET,(err,decode)=>{
    if(err) {
      res.json({msg:"unable to authenticated",logged:false})
      console.log(err)
    }else {
      res.json({msg:"user has been verified",user:decode,logged:true})


    }
  })
}
)


app.post('/products',fileUpload ({createParentPath:true}), 
  (req, res) => {
  const files = req.files
  let fileName; 

			Object.keys(files).forEach(key =>{
        fileName = files[key].name;
				filepath = path.join(__dirname, 'files',files[key].name)
				files[key].mv(filepath,(err) => {
					if(err) return res.status(500).json({status:"error" , message:err})
				})
			})
  const addproduct ={
    Product_id:generateId(),
    Product_Name:req.body.product_name,
    Product_quantity:req.body.product_quantity,
    Product_file:fileName,
    Product_description: req.body.product_description,
    product_price:req.body.product_price,
    Product_date: currentDate,
    Product_bid_startTime: req.body.start_time,
    Product_bid_closingTime:req.body.closing_time,
    Product_location: req.body.product_location
  }

  // Insert the product data into the database
  connect.con.query('INSERT INTO coooperative_product SET ? ', addproduct, (err, result) => {
    if (err) {
      console.error('Error inserting product data into database:', err);
      res.status(500).json('Error inserting product data into database');
      return;
    }
    console.log('Product data inserted into database');
    res.status(200).send('Product data inserted into database');
  });
})

app.delete('/deleteproduct/:Product_id', (req, res) => {
  const product_id = req.params.Product_id;
  console.log(product_id)
  const sql = 'DELETE FROM coooperative_product WHERE Product_id = ?';
  connect.con.query(sql, [product_id], (err, results) => {
    if (err) {
      return res.send(err);
    }
    return res.send('Product deleted successfully.');
  });
});


app.delete('/deleteuser/:Login_id', (req, res) => {
  const product_id = req.params.Login_id;
  console.log(product_id)
  const sql = 'DELETE FROM login WHERE Login_id = ?';
  connect.con.query(sql, [product_id], (err, results) => {
    if (err) {
      return res.send(err);
    }
    return res.send('user deleted successfully.');
  });
});

app.get('/highestBidder/:productId', (req, res) => {
  const productId = req.params.productId;
  connect.con.query('SELECT * FROM bidding WHERE Bidding_product_id = ? ORDER BY Bidding_total_cost DESC LIMIT 1', [productId], (error, results, fields) => {
    if (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }

    const highestBidder = results[0];

    res.json(highestBidder);
  });
});

app.put('/products/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { Product_Name,Product_location,Product_quantity, Product_description, Product_bid_startTime, Product_bid_closingTime } = req.body;
    console.log(id)
    connect.con.query('UPDATE coooperative_product SET Product_Name=?, Product_quantity=?, Product_description=?,Product_location=?, Product_bid_startTime=?, Product_bid_closingTime=? WHERE Product_id=?', [Product_Name, Product_quantity, Product_description,Product_location, Product_bid_startTime, Product_bid_closingTime, id]);

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get ('/getusers',(req,res)=>{
  const query = 'SELECT * FROM login';
  connect.con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
})
});

app.get('/user-count', (req, res) => {
  connect.con.query('SELECT COUNT(*) AS userCount FROM login', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
      return;
    }
    const userCount = results[0].userCount;
    res.status(200).json({ userCount });
  });
});
app.get('/products', (req, res) => {
  connect.con.query('SELECT COUNT(*) AS productCount FROM coooperative_product', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
      return;
    }
    const productCount = results[0].productCount;
    res.status(200).json({ productCount });
  });
});


app.get('/bid', (req, res) => {
  connect.con.query('SELECT COUNT(*) AS bidCount FROM bidding', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).send('Error executing query');
      return;
    }
    const bidCount = results[0].bidCount;
    res.status(200).json({ bidCount });
  });
});

app.use('/biddings',require("./routes/api/bidding"));

app.use('/buyers',require("./routes/api/buyer"));

app.use('/cooperatives',require("./routes/api/cooperatives"));

app.use('/highestbidder',require("./routes/api/accepted"));

app.use('/getproducts',require("./routes/api/products"));
app.use('/auth',require("./routes/api/auth"));


app.use('/signup1',require("./routes/api/fsignup"));


//mpesa payment
/* let unirest = require('unirest');
let req = unirest('GET', 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials')
.headers({ 'Authorization': 'Bearer cFJZcjZ6anEwaThMMXp6d1FETUxwWkIzeVBDa2hNc2M6UmYyMkJmWm9nMHFRR2xWOQ==' })
.send()
.end(res => {
	if (res.error) throw new Error(res.error);
	console.log(res.raw_body);
});
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));