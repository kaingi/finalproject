import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';
import { CSVLink } from 'react-csv';

export const AddProductLink = ({ sidebar, showSidebar }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:3001/getproducts')
      .then(response => setProducts(response.data))
      .catch(error => console.log(error));
  }, []);
  const csvData = products.map(product => ({
    "Product Name": product.Product_Name,
    "Product quantity":product.Product_quantity,
    "Product description": product.Product_description,
    "Product date": product.Product_date,
    "Product location": product.Product_location
  }));
  
  const handleDelete = (Product_id) => {
    axios.delete(`http://localhost:3001/deleteproduct/${Product_id}`)
      .then(() => {
        setProducts(products.filter(product => product.Product_id !== Product_id));
        alert('Product deleted successfully.');
      })
      .catch(error => console.log(error));
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    
    const updatedProduct = {
      Product_Name: event.target[0].value,
      Product_quantity: event.target[1].value,
      Product_description: event.target[2].value,
      Product_location: event.target[3].value,
      Product_bid_startTime: event.target[4].value,
      Product_bid_closingTime: event.target[5].value
    };
    
    
    const response = await fetch(`http://localhost:3001/products/${selectedProduct.Product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });
    
    const result = await response.json();
    console.log(result);
    
    setSelectedProduct(null);
  };

  return (
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <CSVLink data={csvData} filename={"products.csv"}>
      <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
      export
      </button>
      </CSVLink>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3">
                      Product file
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Product Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Quantity
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Description
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Date
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Location
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>
                      <th scope="col" class="px-6 py-3">
                          Action
                      </th>
                  </tr>
              </thead>
              <tbody>
             
              {products.length > 0 ? (
            products.map((product) => (
                  <tr key={product.Product_id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.Product_file}
                      </th>
                      <td class="px-6 py-4">
                      {product.Product_Name}
                      </td>
                      <td class="px-6 py-4">
                      {product.Product_quantity}
                      </td>
                      <td class="px-6 py-4">
                      {product.Product_description}
                      </td>
                      <td class="px-6 py-4">
                      {product.Product_date}
                      </td>
                      <td class="px-6 py-4">
                      {product.Product_location}
                      </td>
                      <td class="px-6 py-4">
                      <button onClick={() => handleUpdate(product)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
                      </td>
                      <td class="px-6 py-4">
                      <button onClick={() => handleDelete(product.Product_id)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>
                      </td>
                  </tr>
                  ))
                  ) : (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td class="px-6 py-4">
                    Product not found
                    </td>
                  </tr>
            )}
      
              </tbody>
          </table>
        {selectedProduct && (
        <div id="update-form-popup">
          <form onSubmit={handleUpdateSubmit}>
            <label htmlFor="product-name">Product Name:</label>
            <input type="text" id="product-name" defaultValue={selectedProduct.Product_Name} />
            <label htmlFor="product-quantity">Quantity:</label>
            <input type="number" id="product-quantity" defaultValue={selectedProduct.Product_quantity} />
            <label htmlFor="product-description">Description:</label>
            <input type="text" id="Product_location" defaultValue={selectedProduct.Product_location} />
            <label htmlFor="Product_location">location:</label>
            <textarea id="product-description" defaultValue={selectedProduct.Product_description}></textarea>
            <label htmlFor="product-quantity">Start Date:</label>
            <input type="datetime-local" id="product-startTime" defaultValue={selectedProduct.Product_bid_startTime} />
            <label htmlFor="product-quantity">End Date:</label>
            <input type="datetime-local" id="product-startTime" defaultValue={selectedProduct.Product_bid_closingTime} />
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update Product</button>
            <button onClick={() => setSelectedProduct(null)} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Cancel</button>
            </form>
        </div>
      )}
      </div>
      
      );
      };
