import React from "react";

const Navbar = ({ loggedIn = true }) => {
  return (
    <nav className="w-full flex justify-between px-5 py-3 font-['helvetica_now_display']">
      <h3 className="text-xl">Bagify</h3>
      {loggedIn && (
        <div className="flex gap-5">
          <a href="/shop">Shop</a>
          <a href="/cart">Cart</a>
          <a href="/myaccount">My Account</a>
          <a className="text-red-600" href="/users/logout">
            Logout
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
