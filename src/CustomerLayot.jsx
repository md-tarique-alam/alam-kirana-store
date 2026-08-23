import React, { useState } from 'react'
import Navbar from './components/navbar';
import CartSidebar from './components/CartSidebar';
import { Outlet } from 'react-router-dom';

const CustomerLayot = () => {

const [search, setSearch] = useState("");

  return ( 
    <div>
        <Navbar search={search} setSearch={setSearch} />
        <CartSidebar/>
        <Outlet context={{search}} />
    </div>
  )
}

export default CustomerLayot