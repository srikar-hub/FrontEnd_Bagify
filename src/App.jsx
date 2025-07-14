import { Route } from "react-router-dom";
import "./App.css";
import { Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import AccountPage from "./pages/MyAccount";
import ShopPage from "./pages/Shop";
import CartPage from "./pages/Cart";
import Header from "./components/Header";
import AddressPage from "./pages/Address";
import OrderSuccess from "./pages/OrderSuccess";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <Header />
      <Routes>
        <Route path="/addproduct" element={<Admin />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myaccount" element={<AccountPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:category" element={<ShopPage />} />
        <Route path="/address" element={<AddressPage />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
      </Routes>
    </>
  );
}

export default App;
