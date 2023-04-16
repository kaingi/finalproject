import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './product.css';

export const Users = ({ sidebar, showSidebar }) => {
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);
  /* const [selectedProduct, setSelectedProduct] = useState(null); */
  useEffect(() => {
    axios.get('http://localhost:3001/getusers')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDelete = (Login_id) => {
    axios.delete(`http://localhost:3001/deleteuser/${Login_id}`)
      .then(() => {
        setUsers(users.filter(users => users.Login_id !== Login_id));
        alert('user deleted successfully.');
      })
      .catch(error => console.log(error));
  };

  const handleUpdateClick = () => {
    setShowModal(true);
  };
  
  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                user Name
                </th>
                <th scope="col" class="px-6 py-3">
                Email
                </th>
                <th scope="col" class="px-6 py-3">
                Role
                </th>
                <th scope="col" class="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {users.length > 0 ? (
         users.map((users) => (
            <tr key={users.Login_id} class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {users.login_name}
                </th>
                <td class="px-6 py-4">
                {users.login_email}
                </td>
                <td class="px-6 py-4">
                {users.login_roles}
                </td>
                <td class="px-6 py-4">
                <button className ='px-5 py-2 bg-blue-500 text-white font-bold' onClick={() => handleDelete(users.Login_id)}>Delete</button>
                </td>
            </tr>
            ))
            ) : (
            <tr>
            <td class="px-6 py-4">
            No users found.
            </td>
            </tr>
            )}
        </tbody>
    </table>
    </div>
      );
  }
