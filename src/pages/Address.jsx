import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    pincode: "",
    address: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:4000/address/", {
        withCredentials: true,
      });
      setAddresses(res.data.addresses || []);
    } catch {
      setError("Failed to fetch addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await axios.post("http://localhost:4000/address/create", form, {
        withCredentials: true,
      });
      setSuccess("Address added successfully!");
      setForm({
        fullName: "",
        mobile: "",
        pincode: "",
        address: "",
        city: "",
        state: "",
      });
      fetchAddresses();
    } catch {
      setError("Failed to add address");
    }
  };

  // Place order handler
  const handlePlaceOrder = async () => {
    setError("");
    setSuccess("");
    if (!selectedAddress) {
      setError("Please select an address to place the order.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:4000/cart/checkout",
        { addressId: selectedAddress },
        { withCredentials: true }
      );
      setSuccess("Order placed successfully!");
      setTimeout(() => navigate("/ordersuccess"), 1500); // Redirect to order success page
    } catch {
      setError("Failed to place order");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 py-10 px-2 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        Select or Add Address
      </h2>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}
      <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8">
        {/* Address List */}
        <div className="flex-1 bg-white rounded-lg shadow p-5">
          <h3 className="text-lg font-semibold mb-4">Saved Addresses</h3>
          {loading ? (
            <div>Loading...</div>
          ) : addresses.length === 0 ? (
            <div className="text-gray-500">No addresses found.</div>
          ) : (
            <ul className="space-y-4">
              {addresses.map((addr) => (
                <li
                  key={addr._id}
                  className={`border rounded p-3 bg-gray-50 ${
                    selectedAddress === addr._id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="font-semibold">{addr.fullName}</div>
                  <div>
                    {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                  </div>
                  <div>Mobile: {addr.mobile}</div>
                  <button
                    className={`mt-2 px-3 py-1 rounded ${
                      selectedAddress === addr._id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                    onClick={() => setSelectedAddress(addr._id)}
                    type="button"
                  >
                    {selectedAddress === addr._id ? "Selected" : "Select"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Place Order Button */}
        <div className="w-full flex flex-col items-center mt-6">
          <button
            type="button"
            className="bg-green-600 text-white rounded px-6 py-3 font-semibold text-lg shadow hover:bg-green-700 transition-colors"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
        {/* Address Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 bg-white rounded-lg shadow p-5 flex flex-col gap-3"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="border rounded px-3 py-2"
          />
          <input
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
            placeholder="Mobile"
            className="border rounded px-3 py-2"
          />
          <input
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            required
            placeholder="Pincode"
            className="border rounded px-3 py-2"
          />
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            placeholder="Address"
            className="border rounded px-3 py-2"
          />
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="City"
            className="border rounded px-3 py-2"
          />
          <input
            name="state"
            value={form.state}
            onChange={handleChange}
            required
            placeholder="State"
            className="border rounded px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded px-4 py-2 mt-2 hover:bg-blue-600"
          >
            Save Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressPage;
