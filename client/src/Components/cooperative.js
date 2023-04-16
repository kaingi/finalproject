import React, { useState, useEffect } from 'react';

export function CooperativeList() {
  const [cooperatives, setCooperatives] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/cooperatives')
      .then(response => response.json())
      .then(data => setCooperatives(data));
  }, []);

  return (
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
                  <tr>
                      <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                      Cooperative Name
                      </th>
                      <th scope="col" class="px-6 py-3">
                      Mobile
                      </th>
                      <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                      Email
                      </th>
                  </tr>
              </thead>
              <tbody>
              {cooperatives.length > 0 ? (
            cooperatives.map((cooperative) => (
                  <tr key={cooperative.Coooperative_id} class="border-b border-gray-200 dark:border-gray-700">
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                      {cooperative.Coooperative_Name}
                      </th>
                      <td class="px-6 py-4">
                      {cooperative.Coooperative_Mobile}
                      </td>
                      <td class="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                      {cooperative.Coooperative_email}
                      </td>
                  </tr>
                  ))
                  ) : (
                  <tr class="border-b border-gray-200 dark:border-gray-700">
                      <td class="px-6 py-4">
                      No cooperative found.
                      </td>
                  </tr>
                  )}
              </tbody>
          </table>
      </div>
      );
    }
