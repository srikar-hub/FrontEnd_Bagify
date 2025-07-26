import { API_BASE_URL } from "../api";
import React, { useEffect, useState } from "react";
import axios from "axios";
const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await axios.get(`${API_BASE_URL}/me`, {
          withCredentials: true,
        });
        setUser(userRes.data.user);
      } catch {
        setError("Failed to fetch account info");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gray-50 font-['Inter'] min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full flex flex-col items-center mt-16">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-4 overflow-hidden">
          {/* User profile picture or fallback icon */}
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {user?.name || user?.username || "-"}
        </h2>
        <div className="text-gray-600 mb-1">
          <b>Email:</b> {user?.email || "-"}
        </div>
        <div className="text-gray-600 mb-1">
          <b>Phone Number:</b> {user?.phoneNumber || user?.phone || "-"}
        </div>
        <div className="text-gray-600 mb-1">
          <b>Address:</b> {user?.address || "-"}
        </div>
        {user?._id && (
          <div className="text-gray-600 mb-1">
            <b>User ID:</b> {user._id}
          </div>
        )}
        <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium mt-2">
          <i className="fas fa-sign-out-alt mr-2"></i>Logout
        </button>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
        {loading && <div className="text-center mt-4">Loading...</div>}
      </div>
    </div>
  );
};

export default AccountPage;
