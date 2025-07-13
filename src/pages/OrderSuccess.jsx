import React, { useEffect, useState } from "react";
import axios from "axios";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function getDeliveryDate(orderDate) {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + 3);
  return formatDate(date);
}

const OrderSuccess = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get("http://localhost:4000/cart/myorders", {
          withCredentials: true,
        });
        setOrderItems(res.data.orders || []);
      } catch {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Group items by orderDate (or _id if needed)
  const groupedOrders = React.useMemo(() => {
    if (!orderItems.length) return [];
    // Use orderDate as the grouping key
    const map = new Map();
    orderItems.forEach((item) => {
      const key = item.orderDate || item._id;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(item);
    });
    // Convert to array and sort by orderDate ascending
    return Array.from(map.entries())
      .map(([orderDate, items]) => ({
        orderDate,
        items,
      }))
      .sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
  }, [orderItems]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-50 to-blue-50 py-10 px-2 md:px-0">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl w-full flex flex-col items-center">
        <svg
          width="60"
          height="60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-green-500 mb-4"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeWidth="2"
            stroke="currentColor"
            fill="#d1fae5"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2l4-4"
          />
        </svg>
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          ✅ Order Placed Successfully!
        </h2>
        <p className="text-gray-700 mb-4">
          Thank you for your purchase. Below are all your orders and their
          delivery dates.
        </p>
        {loading ? (
          <div>Loading orders...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : groupedOrders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <div className="w-full">
            {orderItems.map((order, orderIdx) => (
              <div key={order._id || order.orderDate} className="mb-8">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">
                  Order {orderIdx + 1}
                </h3>
                <div className="mb-2 text-gray-700">
                  <b>Delivery Address:</b>{" "}
                  {order.address && typeof order.address === "object" ? (
                    <span>
                      {order.address.fullName}, {order.address.address},{" "}
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.pincode}, Mobile: {order.address.mobile}
                    </span>
                  ) : (
                    <span>-</span>
                  )}
                </div>
                <div className="overflow-x-auto w-full">
                  <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="px-4 py-2 text-left">S.No</th>
                        <th className="px-4 py-2 text-left">Product Name</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Discount</th>
                        <th className="px-4 py-2 text-left">
                          Discounted Price
                        </th>
                        <th className="px-4 py-2 text-left">Quantity</th>
                        <th className="px-4 py-2 text-left">Ordered On</th>
                        <th className="px-4 py-2 text-left">Delivery Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products &&
                        order.products.map((item, idx) => {
                          const price = item.productId?.price || 0;
                          const discount = item.productId?.discount || 0;
                          const discountedPrice = price - discount;
                          return (
                            <tr key={item._id || idx} className="border-b">
                              <td className="px-4 py-2 font-semibold">
                                {idx + 1}
                              </td>
                              <td className="px-4 py-2 font-semibold text-blue-800">
                                {item.productId?.name || "Product"}
                              </td>
                              <td className="px-4 py-2">₹{price}</td>
                              <td className="px-4 py-2 text-green-700">
                                ₹{discount}
                              </td>
                              <td className="px-4 py-2 text-blue-700">
                                ₹{discountedPrice}
                              </td>
                              <td className="px-4 py-2">{item.quantity}</td>
                              <td className="px-4 py-2">
                                {formatDate(order.orderDate)}
                              </td>
                              <td className="px-4 py-2">
                                {getDeliveryDate(order.orderDate)}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {/* Total Bill Section */}
                  <div className="flex justify-end mt-4">
                    <div className="bg-gray-100 rounded p-4 w-full max-w-xs">
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">
                          Total (Before Discount):
                        </span>
                        <span>
                          ₹
                          {order.products.reduce(
                            (sum, item) =>
                              sum +
                              (item.productId?.price || 0) * item.quantity,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold">Total Discount:</span>
                        <span className="text-green-700">
                          -₹
                          {order.products.reduce(
                            (sum, item) =>
                              sum +
                              (item.productId?.discount || 0) * item.quantity,
                            0
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total Bill:</span>
                        <span className="text-blue-700">
                          ₹
                          {order.products.reduce(
                            (sum, item) =>
                              sum +
                              ((item.productId?.price || 0) -
                                (item.productId?.discount || 0)) *
                                item.quantity,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSuccess;
