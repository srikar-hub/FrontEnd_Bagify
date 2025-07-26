import { API_BASE_URL } from "../api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/cart/`, {
        withCredentials: true,
      });
      setCart(res.data.cart || []);
    } catch {
      setError("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  // Remove product from cart
  const handleRemove = async (productId) => {
    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/cart/remove`,
        { productId },
        { withCredentials: true }
      );
      await fetchCart();
    } catch {
      setError("Failed to remove item");
      setLoading(false);
    }
  };

  // Calculate totals
  let totalMRP = 0,
    totalDiscount = 0,
    totalAmount = 0;
  cart.forEach((item) => {
    const price = item.productId?.price || 0;
    const discount = item.productId?.discount || 0;
    const qty = item.quantity || 1;
    totalMRP += price * qty;
    totalDiscount += discount * qty;
    totalAmount += (price - discount) * qty;
  });
  // Platform fee: 20 if at least 1 item, else 0
  const platformFee = cart.length > 0 ? 20 : 0;
  totalAmount += platformFee;

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 text-xl">
        Loading cart...
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-md bg-red-500 shadow-md z-50">
          <span className="text-white font-medium">{error}</span>
        </div>
      )}

      <div className="w-full min-h-screen flex flex-col px-4 md:px-20 py-10 gap-10 bg-gradient-to-br from-gray-100 to-blue-50">
        <h2 className="text-3xl font-bold mb-5 text-blue-700 tracking-tight">
          My Cart
        </h2>

        <form id="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col md:flex-row gap-10">
            {/* Product List */}
            <div className="w-full md:w-[65%] flex flex-col gap-8">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                    alt="Empty Cart"
                    className="w-32 h-32 mb-4 opacity-70"
                  />
                  <div className="text-lg text-gray-500 font-medium">
                    Your cart is empty.
                  </div>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={item.productId?._id || idx}
                    className="w-full flex flex-col md:flex-row items-center md:items-start gap-5 rounded-xl overflow-hidden bg-white shadow hover:shadow-lg transition-shadow p-5 relative border border-gray-200"
                  >
                    {/* Remove button (not functional yet) */}
                    <button
                      type="button"
                      className="absolute top-5 right-5 text-red-500 hover:text-red-700 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-300"
                      title="Remove from cart"
                      onClick={() => handleRemove(item.productId?._id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-x-circle"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                      </svg>
                    </button>

                    {/* Product Image */}
                    <div className="w-32 h-32 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                      <img
                        className="w-full h-full object-contain"
                        src={
                          item.productId?.image?.data
                            ? `data:${
                                item.productId?.image?.contentType ||
                                "image/jpeg"
                              };base64,${item.productId?.image?.data}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.productId?.name || "Product"}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col flex-grow gap-1">
                      <h3 className="text-xl font-semibold text-blue-800 mb-1">
                        {item.productId?.name || "Product Name"}
                      </h3>
                      <div className="flex gap-3 items-center">
                        <span className="text-gray-500 line-through text-sm">
                          ₹{item.productId?.price}
                        </span>
                        <span className="text-red-500 font-bold text-lg">
                          ₹{item.productId?.price - item.productId?.discount}
                        </span>
                        <span className="text-green-600 text-xs font-medium">
                          ({item.productId?.discount} off)
                        </span>
                      </div>
                      <span className="text-gray-600 text-sm">
                        Quantity:{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </span>
                      <span className="text-gray-600 text-sm">
                        Subtotal:{" "}
                        <span className="font-semibold">
                          ₹
                          {(item.productId?.price - item.productId?.discount) *
                            item.quantity}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-[35%] rounded-xl bg-white shadow-lg p-7 flex flex-col gap-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">
                Price Breakdown
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span>Total MRP</span>
                  <span id="total-mrp">₹ {totalMRP}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Total Discount</span>
                  <span id="total-discount">₹ {totalDiscount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Platform Fee</span>
                  <span>₹ {platformFee}</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200 my-5"></div>
                <div className="flex justify-between font-semibold text-lg text-blue-900">
                  <span>Total Amount</span>
                  <span id="total-price">₹ {totalAmount}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-blue-500 text-white rounded-md py-3 mt-2 font-semibold text-lg shadow hover:bg-blue-600 transition-colors"
                disabled={cart.length === 0}
                onClick={() => navigate("/address")}
              >
                Buy Now
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default CartPage;
