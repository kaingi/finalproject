import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const BidWinner = () => {
  const [AcceptBids, setAcceptBids] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/highestbidder')
      .then(response => setAcceptBids(response.data))
      .catch(error => console.log(error));
  }, []);
  return (
    
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Buyer Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                    Product
                    </th>
                    <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                    Amount
                    </th>
                </tr>
            </thead>
            <tbody>
            {AcceptBids.length > 0 ? (
          AcceptBids.map((AcceptBids) => (
                <tr key={AcceptBids.Accepted_id} class="border-b border-gray-200 dark:border-gray-700">
                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                    {AcceptBids.Buyer_name}
                    </th>
                    <td class="px-6 py-4">
                    {AcceptBids.Product_Name}
                    </td>
                    <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {AcceptBids.Accepted_Amount}
                    </td>
                </tr>
                ))
                ) : (
                <tr class="border-b border-gray-200 dark:border-gray-700">
                    <td class="px-6 py-4">
                    No bids found.
                    </td>
                </tr>
                )}
            </tbody>
        </table>
    </div>

      );
      };


