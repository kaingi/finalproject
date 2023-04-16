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

export const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [showBidForm, setShowBidForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    Getuser();
    
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
 const token = localStorage.getItem("buyerToken")
  const Getuser = ()=>{
    axios.post("http://localhost:3001/user/authenticate",{token:token})
    .then((res)=>{
      console.log(res)
      if(res.data.logged) {
      getproducts()
    }
      else{
        navigate("/login")
      }
    })
    .catch((err)=>{
      console.log(err)
    })

  }
  
  useEffect(() => {
    const now = new Date();
    products.forEach(product => {
      const endTime = new Date(product.Product_bid_closingTime);
      if (now >= endTime) {
        console.log(product.Product_id);
        console.log("hello world");
        axios.get(`http://localhost:3001/highestbidder/${product.Product_id}`)
          .then(response => {
            console.log(response); // highest bidder information

            // Send response to database
            axios.post('http://localhost:3001/highestbidder', {
              Bidding_id: response.data.Bidding_id,
              Bidding_buyers_id: response.data.Bidding_buyers_id,
              Bidding_total_cost: response.data.Bidding_total_cost,
              Bidding_product_id: product.Product_id
            })
            .catch(error => {
              console.log(error);
              // TODO: Handle database update error
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }, [products]);
  
  const handleBidClick = (product) => {
    setSelectedProduct(product);
    setShowBidForm(true);
  }
  const handleBidSubmit = (event) => {
    event.preventDefault();
    const bidAmount = event.target.bidAmount?.value;
    const description = event.target.description?.value;
    console.log(selectedProduct.Product_id)
    console.log(bidAmount)
    console.log(description)
  
    const loginId = localStorage.getItem('buyerLogin'); // Obtain the Login_id value from local storage
  
    if (bidAmount && loginId) {
      fetch('http://localhost:3001/biddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: selectedProduct.Product_id,
          bid_amount: bidAmount,
          description: description,
          Login_id: loginId // Add the Login_id value to the request body
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setShowBidForm(false);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  
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
      {bidButtonVisible && (
        <BidButton onClick={() => handleBidClick(product)}>Bid Now</BidButton>
      )}
       </div>
       </div>
    );
  }
  )}
  </div>
</div>
      {showBidForm && (
       <BidForm onSubmit={handleBidSubmit}>
        <BidFormExit onClick={() => setShowBidForm(false)}>X</BidFormExit>
        <h2>{selectedProduct.Product_Name}</h2>
        <p>{selectedProduct.Product_quantity} tonnes</p>
        <p>{selectedProduct.product_price} dollar</p>
        <BidInput type="number" placeholder="Enter maximum bid amount" name="bidAmount" />
        <BidTextArea placeholder="Enter description" name="description" />
        <BidButton type="submit">Submit Bid</BidButton>
     </BidForm>     
      )}
    </div>
  );
};
