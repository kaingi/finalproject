const connect = require('../config/dbcon');

const getAllProducts = (req, res) => {
  const query = 'SELECT * FROM coooperative_product';
  connect.con.query(query, (error, results) => {
    if (error) throw error;
    res.json(results);
  });
}

const removeProduct = async (req, res) => {
  try {
    const productId = 'req.params.productId';
    console.log(req.params.productId)
    const [result] = await connect.con.query('DELETE FROM coooperative_product WHERE Product_id = ?', [productId]);
    if (result.affectedRows === 0) {
      res.status(404).send({ message: `Product with id ${productId} not found` });
    } else {

      res.sendStatus(204); // No content
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal server error' });
  }
}; 
module.exports = {
  getAllProducts,
  removeProduct
};