import React, { useState, useEffect } from 'react';

export function BuyerList() {
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/buyers')
      .then(response => response.json())
      .then(data => setBuyers(data));
  }, []);

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                Name
                </th>
                <th scope="col" class="px-6 py-3">
                Phone
                </th>
                <th scope="col" class="px-6 py-3">
                Email
                </th>
            </tr>
        </thead>
        <tbody>
        {buyers.length > 0 ? (
        buyers.map((buyer) => (
            <tr key={buyer.Buyer_id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {buyer.Buyer_name}
                </th>
                <td class="px-6 py-4">
                {buyer.Buyer_phone_no}
                </td>
                <td class="px-6 py-4">
                {buyer.Buyer_email}
                </td>
            </tr>
            ))
        ):(
          <tr class="border-b border-gray-200 dark:border-gray-700">
              <td class="px-6 py-4">
              No Buyers found.
              </td>
          </tr>
          )}
        </tbody>
    </table>
  </div>

  );
}
