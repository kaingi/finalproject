import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

export const Activebidding = () => {
  const [Bids, setBids] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/biddings')
      .then(response => setBids(response.data.data))
      .catch(error => console.log(error));
  }, []);

  const csvData = Bids.map(bid => ({
    "Buyer's Name": bid.Buyer_name,
    "Total Cost": bid.Bidding_total_cost,
    "Product Name": bid.Product_Name,
    "Description": bid.Bidding_desc,
    "Date": bid.Bidding_date
  }));

  return (
<div>
  <div class='flex justify_right gap-5 '>
  <h2>Bids List</h2>
    <CSVLink data={csvData} filename={"bids.csv"}>
      <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
      export
      </button>
    </CSVLink>
    
    
  </div>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Buyer's Name
                </th>
                <th scope="col" class="px-6 py-3">
                Total Cost
                </th>
                <th scope="col" class="px-6 py-3">
                Product Name
                </th>
                <th scope="col" class="px-6 py-3">
                Description
                </th>
                <th scope="col" class="px-6 py-3">
                Date
                </th>
            </tr>
        </thead>
        <tbody>
        {Bids.length > 0 ? (
          Bids.map((bid) => (
            <tr key={bid.Bidding_id} class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {bid.Buyer_name}
                </th>
                <td class="px-6 py-4">
                {bid.Bidding_total_cost}
                </td>
                <td class="px-6 py-4">
                {bid.Product_Name}
                </td>
                <td class="px-6 py-4">
                {bid.Bidding_desc}
                </td>
                <td class="px-6 py-4">
                {bid.Bidding_date}
                </td>
            </tr>
            ))
            ) : (
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="px-6 py-4">
                No bids found.
                </td>
            </tr>
            )}
        </tbody>
        
    </table>
</div>
</div>
  );
}
