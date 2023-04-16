import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {LoginPage} from "./Components/login.js";
import {SignupPageCustomer} from "./Components/cooperativeSignup";
import {SignupPage} from "./Components/signupF";
import { AddProductLink } from "./Components/product";
import {AddProductForm} from "./Components/AddProductForm";
import {Dashboard} from "./Components/Dashboard";
import {Activebidding} from "./Components/Activebidding";
import {SignupPageBuyer} from "./Components/buyerSignup";
import {Users} from "./Components/users"
import {BidWinner} from './Components/Bidwinner';
import {BuyerList} from "./Components/Buyer";
import {CooperativeList} from './Components/cooperative';
import {Logout} from './Components/logout.js'
import {Dashaboard} from "./Components/dash";


import {Navbar} from "./Dashboard/Homepage";
import {FarmerDashboard} from "./Dashboard/FarmerDashboard";
import { AdminDashboard } from "./Dashboard/AdminDashboard";
import { BuyerDashboard } from "./Dashboard/BuyerDashboard";
import { CooperativeDashboard } from "./Dashboard/CooperativeDashboard";


export default function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={< Navbar/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path="/cooperativeSign" element={<SignupPageCustomer/>}/>
      <Route path="/product" element={<AddProductLink/>}/>
      <Route path="/add-product" element={<AddProductForm/>}/>
      <Route path="/bids" element={<Activebidding/>}/>
      <Route path="/BuyerSign" element={<SignupPageBuyer/>}/>
      <Route path="/Buyerlist" element={<BuyerList/>}/>
      <Route path="/Bidwinner" element={<BidWinner/>}/>
      <Route path="/cooperativelist" element={<CooperativeList/>}/>
      <Route path="/logout" element={<Logout/>}/>
      
      <Route path='/Dash' element={<Dashaboard/>} />
      <Route path="/home" element={<Dashboard/>}/>
      <Route path='/Admin' element={< AdminDashboard/>} />
      <Route path="/Buyer" element={<BuyerDashboard/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/cooperative" element={<CooperativeDashboard/>}/>
      <Route path="/Farmer" element={<FarmerDashboard/>}/>
    </Routes>
    </Router>
  );
}
