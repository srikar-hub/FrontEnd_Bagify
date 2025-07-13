import React, { useState, useEffect } from "react";
// Helper to convert Buffer (array) to base64
function bufferToBase64(buffer) {
  if (!buffer) return "";
  // If it's already a string, return as is
  if (typeof buffer === "string") return buffer;
  // If it's an object with 'data' property (from MongoDB Binary), use that
  if (buffer.data && Array.isArray(buffer.data)) buffer = buffer.data;
  // Convert array to Uint8Array, then to base64
  const uint8Array = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return window.btoa(binary);
}
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:4000/product/all", {
          withCredentials: true,
        });
        setProducts(res.data.products);
        res.data.products.forEach((product) => {
          if (product.image?.data) {
            console.log(
              `Image Data for ${product.name.substring(0, 10)}...:`,
              product.image.data.substring(0, 50) + "..."
            ); // Log a snippet
            console.log(
              `Data URL for ${product.name.substring(0, 10)}...:`,
              `data:${
                product.image?.contentType || "image/jpeg"
              };base64,${product.image.data.substring(0, 50)}...`
            );
          } else {
            console.log(`No image data for ${product.name}`);
          }
        });
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          setError("Failed to fetch Products");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold">Loading products...</div>
      </div>
    );
  }

  // Add to Cart handler
  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    const form = e.target;
    const quantity = parseInt(form.quantity.value, 10) || 1;
    try {
      await axios.post(
        "http://localhost:4000/cart/add",
        { productId, quantity },
        { withCredentials: true }
      );
      setSuccess("Added to cart!");
      setTimeout(() => setSuccess(""), 2000);
    } catch {
      setError("Failed to add to cart");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <>
      {error && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-md bg-red-500 shadow-md z-50">
          <span className="text-white font-medium">{error}</span>
        </div>
      )}
      {success && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 p-3 rounded-md bg-green-500 shadow-md z-50">
          <span className="text-white font-medium">{success}</span>
        </div>
      )}

      <div className="w-full min-h-screen flex px-10 py-10 bg-gray-100">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white rounded-lg p-5 shadow-md">
          <h3 className="text-xl font-semibold mb-5">Filters</h3>
          <div className="mb-5">
            <h4 className="text-lg font-medium">Sort By</h4>
            <form method="GET" className="mt-2">
              <select
                name="sortby"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="default">Select</option>
                <option value="lowtohigh">Price (Low to High)</option>
                <option value="hightolow">Price (High to Low)</option>
              </select>
            </form>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-3/4 grid grid-cols-4 gap-6 px-5">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  className="h-52 flex items-center justify-center"
                  style={{ backgroundColor: product.bgcolor }}
                >
                  <img
                    src={
                      product.image?.data
                        ? `data:${
                            product.image?.contentType || "image/jpeg"
                          };base64,${bufferToBase64(product.image.data)}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={product.name}
                    className="h-40 object-contain"
                  />
                </div>

                <div
                  className="p-4"
                  style={{
                    backgroundColor: product.panelcolor,
                    color: product.textcolor,
                  }}
                >
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-red-500 font-bold text-lg">
                      ₹{product.price - product.discount}
                    </span>
                    <span className="text-gray-500 line-through text-sm">
                      ₹{product.price}
                    </span>
                    <span className="text-green-500 text-sm font-medium ml-2">
                      ( ₹{product.discount} off)
                    </span>
                  </div>

                  <form
                    className="mt-4 flex items-center gap-2"
                    onSubmit={(e) => handleAddToCart(e, product._id)}
                  >
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={1}
                      min="1"
                      className="w-16 border border-gray-300 rounded px-2 py-1"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </form>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 flex items-center justify-center">
              <p className="text-lg text-gray-500">No products found</p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default ShopPage;
