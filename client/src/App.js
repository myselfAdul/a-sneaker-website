import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Company from "./pages/Company";
import Contact from "./pages/Contact";
import Offices from "./pages/Offices";
import Products from "./pages/Products";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import ShowProducts from "./pages/Admin/ShowProducts";
import Bidding from "./pages/Admin/Bidding";
import Profile from "./pages/user/Profile";
import UserOrders from "./pages/user/UserOrders";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Regular from "./pages/Regular";
import Exclusive from "./pages/Exclusive";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";

import WishPage from './pages/WishPage.js';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product-details/:pid" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/regular" element={<Regular />} />
        <Route path="/exclusive" element={<Exclusive />} />
        <Route path="/cart" element={<CartPage />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/user-orders" element={<UserOrders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/show-products" element={<ShowProducts />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:pid" element={<UpdateProduct />} />
          <Route path="admin/create-bidding" element={<Bidding />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/offices" element={<Offices />} />
        <Route path="/products" element={<Products />} />
        <Route path='/wish' element={<WishPage/>}/>
      </Routes>
    </>
  );
}

export default App;
