import { API_BASE_URL } from "../api";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Header = ({ loggedIn = true }) => {
  const handleLogout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/logout`, {
        withCredentials: true,
      });
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="w-full flex justify-between px-5 py-3 font-['helvetica_now_display']">
      <h3 className="text-xl">Bagify</h3>
      {loggedIn && (
        <div className="flex gap-5">
          <NavLink to="/shop">Shop</NavLink>
          <NavLink to="/cart">Cart</NavLink>
          <NavLink to="/ordersuccess">My Orders</NavLink>
          <NavLink to="/myaccount">My Account</NavLink>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Header;
