import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: "📊", end: true },
    { name: "Products", path: "/admin/products", icon: "📦" },
    { name: "Add Product", path: "/admin/addproduct", icon: "➕" },
    { name: "Orders", path: "/admin/orders", icon: "🛒" },
    { name: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-700 text-xl"
      >
        ☰
      </button>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/40"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-white border-r border-slate-200 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">

          <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Alam <span className="text-lime-600">Kirana</span>
              </h1>

              <p className="text-xs text-slate-500 mt-1">
                Admin Panel
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-500 hover:text-slate-800 text-xl"
            >
              ✕
            </button>
          </div>

          <nav className="flex-1 px-3 py-5 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-lime-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-lime-50 hover:text-lime-700"
                  }`
                }
              >
                <span className="text-base">
                  {item.icon}
                </span>

                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500">
                Store Admin
              </p>

              <p className="text-sm font-semibold text-slate-800 mt-1">
                Manage your store
              </p>
            </div>
          </div>

        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;