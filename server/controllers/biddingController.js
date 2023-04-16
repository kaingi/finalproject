const connect = require('../config/dbcon');

// Get the current date and time
const currentDate = new Date();

const { v4: uuidv4 } = require('uuid');
const PREFIX = 'Bi-';

// Function to generate a new UUID with a prefix
function generateId() {
  const uuid = uuidv4();
  const id = PREFIX + uuid;
  return id;
}

const addnewbid = (req,res)=>{
  const bidderLoginId = req.body.Login_id;
  let bidderId;
  console.log(bidderLoginId);

  const sqlSelectBuyerId = `SELECT Buyer_id FROM buyer WHERE Buyer_login_id = '${bidderLoginId}';`;
  
  const sqlInsertBid = `
    INSERT INTO bidding 
      (Bidding_id, Bidding_buyers_id, Bidding_total_cost, Bidding_desc, Bidding_product_id, Bidding_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  
  const groupsql = `
    SELECT Bidding_product_id, COUNT(*) as count FROM bidding GROUP BY Bidding_product_id
  `;
  
  connect.con.query(sqlSelectBuyerId, (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    
    bidderId = results[0].Buyer_id;
  
    const addBid = [
      generateId(),
      bidderId,
      req.body.bid_amount,
      req.body.description,
      req.body.product_id,
      currentDate
    ];
  
    const sqlGetMaxProductPrice = `
      SELECT MAX(product_price) as highest_bid
      FROM coooperative_product
      WHERE Product_id = '${req.body.product_id}';
    `;  
    
    connect.con.query(sqlGetMaxProductPrice, (error, results) => {
      if (error) {
        console.error(error);
        return;
      }
    
      // Get the highest bid price from the first row of the results
      const highestBid = results[0].highest_bid;
    
      // Compare the highest bid price to the user-entered price
      if (req.body.bid_amount > highestBid) {
        // Execute the SQL INSERT statement
        connect.con.query(sqlInsertBid, addBid, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          connect.con.query(groupsql, (error, results) => {
            if (error) {
              console.error(error);
              return;
            }
          })
          // Send response to front-end
          res.json({success: true, message: `New bid of ${req.body.bid_amount} inserted into prices table for product`});
        });
      }
    })
  });
}
const getAllBids = (req, res) => {
  const sql = `
    SELECT bidding.*, buyer.Buyer_name, coooperative_product.Product_Name
    FROM bidding
    JOIN buyer ON bidding.Bidding_buyers_id = buyer.Buyer_id
    JOIN coooperative_product ON bidding.Bidding_product_id = coooperative_product.Product_id
  `;

  connect.con.query(sql, (error, results) => {
    if (error) {
      console.error(error);
      return;
    }
    res.json({success: true, data: results});
  });
}

module.exports ={
    addnewbid,
    getAllBids
}