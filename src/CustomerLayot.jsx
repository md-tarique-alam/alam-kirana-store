import React, { useState } from 'react'
import Navbar from './components/navbar';
import CartSidebar from './components/CartSidebar';
import { Outlet } from 'react-router-dom';
import Footer from './pages/Footer';

const CustomerLayot = () => {

const [search, setSearch] = useState("");

  return ( 
    <div>
        <Navbar search={search} setSearch={setSearch} />
        <CartSidebar/>
        <main>
        <Outlet context={{search}} />
        </main>
        <Footer />
    </div>
  )
}

export default CustomerLayot