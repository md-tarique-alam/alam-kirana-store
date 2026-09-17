import React from 'react'
import AdminSidebar from './AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
        <AdminSidebar/>
        <main>
        <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout