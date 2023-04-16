import React, {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { timeSince } from './functions';
import { ctimeSince } from './Cfunction';
// import timeSince from './functions';


const BidButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
const BidFormExit = styled.button`
  background-color: #ccc;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const BidForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const BidInput = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #ccc;
`;

const BidTextArea = styled.textarea`
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 5px #ccc;
`;

export const Dashaboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getproducts();
    
  }, []);
  function getproducts(){
    axios.get('http://localhost:3001/getproducts')
   
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  
  
  return (
    <div>
      <h1 class="text-3xl font-bold dark:text-white">Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }} >
    <div className='grid grid-cols-4 gap-4'>
    {products.map(product => {
    const now = new Date();
    const startTime = new Date(product.Product_bid_startTime);
    const endTime = new Date(product.Product_bid_closingTime);
    const bidButtonVisible = now >= startTime && now < endTime; 
    const time_since = timeSince(moment(product.Product_bid_startTime).tz('Africa/Nairobi').format());
    const time_close = ctimeSince(moment(product.Product_bid_closingTime).tz('Africa/Nairobi').format());


    return (
      <div  class='rounded  shadow-lg px-4'>
      <img src={`http://localhost:3001/${product.Product_file}`} width='220' height='200' alt={product.Product_name} className='rounded-md'/>
      <div className='px-6 py-4'>
      <div className='font-bold text-purple-500 text-xl mb-2'>{product.Product_Name}</div>
      <ul>
        <li>
          <strong>tonnes:</strong>
          {product.Product_quantity}
        </li>
        <li>
          <strong>Price in dollar:</strong>
          {product.product_price}
        </li>
        <li>
            <strong>Start Time:</strong>
            {time_since}
        </li>
        <li>
          <strong>close:</strong>
          {time_close}
        </li>
      </ul>
       </div>
       </div>
    );
  }
  )}
  </div>
</div>
    </div>
  );
};
