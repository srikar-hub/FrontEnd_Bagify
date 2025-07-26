import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
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
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const location = useLocation();
  const hideHeaderRoutes = ["/", "/login", "/signup"];
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {/* Hide header on reset-password page as well */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route
          path="/addproduct"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/myaccount"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <PrivateRoute>
              <ShopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/shop/:category"
          element={
            <PrivateRoute>
              <ShopPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/address"
          element={
            <PrivateRoute>
              <AddressPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/ordersuccess"
          element={
            <PrivateRoute>
              <OrderSuccess />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
