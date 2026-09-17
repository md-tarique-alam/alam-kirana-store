import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import CategoryPage from "./pages/categorypage";
import ProductPage from "./pages/productpage";
import Authpage from "./pages/Authpage";
import UpdateProfile from "./pages/UpdateProfile";
import Orders from "./pages/Orderspage";
import Address from "./pages/Addresspage";
import Checkout from "./pages/checkoutpage";
import ProtectedRoute from "./components/protectedroutes";
import OrderPlaced from "./pages/orderplaced";
import AdminData from "./Admin/AddProducts";
import Updatepage from "./Admin/updatepage";
import AllProducts from "./Admin/Products";
import CustomerLayot from "./CustomerLayot";
import AdminLayout from "./Admin/AdminLayout";
import Signup from "./pages/Signup";
import UserOrders from "./Admin/Orders";
import Users from "./Admin/Users";
import AdminDashboard from "./Admin/AdminDashboard";

function App() {

  return (
    <div>
    
      <Routes>
        <Route element={ <CustomerLayot/> }>
        <Route path="/" element={<Home/>} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Authpage />} />
        <Route path="/signup" element={<Signup/>} />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/address"
          element={
            <ProtectedRoute>
              <Address />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="/orderplaced" element={<OrderPlaced/>} />
        </Route>

        <Route path="/admin" element={ <AdminLayout/> }>
          <Route index element={<AdminDashboard />} />
        <Route path="addproduct" element={<AdminData/>} />
        <Route path="products" element={<AllProducts/> }/>
        <Route path="products/:id/edit" element={<Updatepage/>} />
        <Route path="orders" element={ <UserOrders/> } />
        <Route path="users" element={ <Users/> }/>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
