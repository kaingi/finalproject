const connect = require('../config/dbcon');

// Get the current date and time
const currentDate = new Date();

const { v4: uuidv4 } = require('uuid');
const PREFIX = 'B-';

// Function to generate a new UUID with a prefix
function generateId() {
  const uuid = uuidv4();
  const id = PREFIX + uuid;
  return id;
}


const addNewBid = (req, res) => {
    const biddingProductID = req.body.Bidding_product_id;
    console.log(biddingProductID)
    // Check if the product ID already exists
    connect.con.query(
      'SELECT * FROM accepted_bidding WHERE Accepted_product_id = ?', 
      [biddingProductID],
      (error, results) => {
        if (error) {
          console.error(error);
          return res.status(500).send('Internal server error');
        }
  
        if (results.length > 0) {
          // Product ID already exists, send response
          return res.status(409).send('Product ID already exists');
        }
  
        // Product ID does not exist, insert new data
        const addbid = {
          Accepted_id: generateId(),
          Accepted_Bidding_id: req.body.Bidding_id,
          Accepted_Buyer_id: req.body.Bidding_buyers_id,
          Accepted_product_id: biddingProductID,
          Accepted_Amount: req.body.Bidding_total_cost,
          Accepted_date: currentDate,
        };
  
        connect.con.query('INSERT INTO accepted_bidding SET ?', addbid, (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).send('Internal server error');
          }
  
          console.log('Data inserted successfully');
          return res.status(200).send('Data inserted successfully');
        });
      }
    );
  };
  
      const getAllaccepted = (req, res) => {
        const sql = `
          SELECT accepted_bidding.*, buyer.Buyer_name, coooperative_product.Product_Name
          FROM accepted_bidding
          JOIN buyer ON accepted_bidding.Accepted_Buyer_id = buyer.Buyer_id
          JOIN coooperative_product ON accepted_bidding.Accepted_product_id = coooperative_product.Product_id
        `;
      
        connect.con.query(sql, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          res.json(results);
        });
      }
      
    module.exports = {
        addNewBid,
        getAllaccepted
    }