import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AddProductForm = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    product_name: '',
    product_quantity: '',
    product_file: '',
    product_description: '',
    product_price:'',
    product_location: '',
    start_time: '',
    closing_time: ''
  });

  const handleInputChange = (event) => {
    if (event.target.type === 'file') {
      setProductData({
        ...productData,
        product_file: event.target.files[0],
      });
    } else {
      setProductData({
        ...productData,
        [event.target.name]: event.target.value,
      });
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('product_name', productData.product_name);
      formData.append('product_quantity', productData.product_quantity);
      formData.append('product_file', productData.product_file);
      formData.append('product_description', productData.product_description);
      formData.append('product_price', productData.product_price);
      formData.append('product_location', productData.product_location);
      formData.append('start_time', productData.start_time);
      formData.append('closing_time', productData.closing_time);

      console.log(productData)
      const response = await axios.post('http://localhost:3001/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      alert('product added succesfully');
      navigate('/product');

      setProductData({
        product_name: '',
        product_quantity: '',
        product_file: '',
        product_description: '',
        product_price:'',
        product_location: '',
        start_time: '',
        closing_time: ''
      });
      setIsLoading(false);
      // redirect back to the previous page or do something else
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <section class="bg-white dark:bg-gray-900">
    <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                    <label for="product_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input type="text" name="product_name" id="product_name" value={productData.product_name} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required=""/>
                </div>
                <div >
                  <label for="product_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Quantity</label>
                    <input type="number" name="product_quantity" id="product_quantity" value={productData.product_quantity} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product quantity" required=""/>
                </div>
                <div class="w-full">
                    <label for="product_price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
                    <input type="number" name="product_price" id="product_price" value={productData.product_price} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required=""/>
                    
                </div>
                <div class="w-full">
                    <label for="product_file" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Image File</label>
                    <input type="file" name="product_file" id="product_file"  onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                </div>
                <div>
                    <label for="start_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Time</label>
                    <input type="datetime-local" name="start_time" id="start_time" value={productData.start_time} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  required=""/>
                    
                </div> 
                <div>
                    <label for="closing_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Closing Time</label>
                    <input type="datetime-local" name="closing_time" id="closing_time" value={productData.closing_time} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required=""/>
                  
                </div> 
                <div>
                    <label for="product_location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Location</label>
                    <input type="text" name="product_location" id="product_location" value={productData.product_location} onChange={handleInputChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Murang'a" required=""/>
                    
                </div>
                <div class="sm:col-span-2">
                    <label for="product_description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                    <textarea id="product_description" name="product_description" value={productData.product_description} onChange={handleInputChange} rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"></textarea>
                </div>
            
            <button type="submit" class='bg-blue-400 m-3 px-10 py-2 font-bold text-xl text-white rounded-xl'>
                Add product
            </button>
            </div>
            </form>
    </div>
  </section>
  );
}
