import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div>
      <aside>
        <nav>
          <NavLink to="/admin" end> Dashboard </NavLink>
          <NavLink to="/admin/products"> Products </NavLink>
          <NavLink to="/admin/addproduct"> Add product </NavLink>
          <NavLink to="/admin/orders"> Orders  </NavLink>
          <NavLink to="/admin/users"> Users  </NavLink>   
        </nav>
      </aside>
    </div>
  );
}

export default AdminSidebar 