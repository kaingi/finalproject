import React, { useState,   } from 'react';
import { useNavigate } from 'react-router-dom';



export function LoginPage() {
  
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleUserEmailChange(event) {
    setUserEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  
    if (!userEmail || !password) {
      alert('Username and password are required');
      return;
    }
    
    fetch('http://localhost:3001/auth', {
      method: 'POST',
      credentials:'include',
      body: JSON.stringify({ userEmail, password }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.success && data.user.login_roles == 'Admin') {
          localStorage.setItem("AdminToken",data.accessToken)
          localStorage.setItem("adminLogin",data.user)
          navigate('/Admin');
          
        } else if(data.success && data.user.login_roles == 'Farmer') {
          console.log(data.user)
          localStorage.setItem("FarmerToken",data.accessToken)
          navigate('/Farmer');
          
        }
        else if(data.success && data.user.login_roles == 'cooperative') {
          console.log(data.user)
          localStorage.setItem("cooperativeToken",data.accessToken)
          navigate('/cooperative');
          
        }
        else if(data.success && data.user.login_roles == 'Buyer') {
          console.log(data.user)
          localStorage.setItem("buyerToken",data.accessToken)
          localStorage.setItem("buyerLogin",data.user.Login_id)
          navigate('/Buyer');
          
        }
        else {
          alert('Login failed. Please try again.');
        }
      })
      .catch(error => {
        alert(`An error occurred: ${error.message}`);
      });
  }
  
  
  return (
    <div class=" flex justify-center align-middle my-16">
      <div class='w-1/4'>
      <h1 class='text-center'>Login</h1>  
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"onSubmit={handleSubmit}>
      <div class="mb-4 my-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" value={userEmail} onChange={handleUserEmailChange}/>
      </div>
      <div class="mb-6 my-10">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" value={password} onChange={handlePasswordChange} placeholder="***********"/>
      </div>
      <button  class='bg-blue-400 m-3 px-10 py-2 font-bold text-xl text-white rounded-xl'type="submit">Login</button>
    </form>
    <p class="text-center text-gray-500 text-xs">
      &copy;2023 David kaingi. All rights reserved.
    </p>
    </div>
  </div>
  );
}


