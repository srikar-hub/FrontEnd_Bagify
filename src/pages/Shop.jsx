import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

const COMPANY_LIST = [
  "Samsonite",
  "American Tourister",
  "Tumi",
  "Wildcraft",
  "Skybags",
  "Wrongn",
  "VIP",
  "Puma",
  "Adidas",
  "Nike",
];
const CATEGORY_LIST = ["Male", "Female", "Children"];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get("http://localhost:4000/product/all", {
          withCredentials: true,
        });
        setProducts(res.data.products);
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
  }, [navigate]);

  // Set selectedCategory from URL param if present
  useEffect(() => {
    if (
      category &&
      CATEGORY_LIST.includes(
        category.charAt(0).toUpperCase() + category.slice(1)
      )
    ) {
      setSelectedCategory(category.charAt(0).toUpperCase() + category.slice(1));
    } else {
      setSelectedCategory("all");
    }
  }, [category, location.pathname]);

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    let matchCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    let matchCompany =
      selectedCompanies.length === 0 ||
      selectedCompanies.includes(product.company);
    return matchCategory && matchCompany;
  });

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

      <div className="w-full min-h-screen flex px-10 py-10 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        {/* Sidebar */}
        <aside className="w-1/4 bg-white rounded-2xl p-7 shadow-xl sticky top-8 self-start border border-blue-100">
          <h3 className="text-2xl font-bold mb-7 text-blue-900 tracking-tight">
            Filters
          </h3>
          {/* Category Filter */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-blue-700">
              Category
            </h4>
            <div className="flex flex-wrap gap-2">
              <button
                className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-150 ${
                  selectedCategory === "all"
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                }`}
                onClick={() => {
                  setSelectedCategory("all");
                  navigate("/shop");
                }}
              >
                All
              </button>
              {CATEGORY_LIST.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-1 rounded-full border text-sm font-medium transition-all duration-150 ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white border-blue-600 shadow"
                      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat);
                    navigate(`/shop/${cat.toLowerCase()}`);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Company Filter */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-3 text-blue-700">
              Company
            </h4>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {COMPANY_LIST.map((company) => (
                <button
                  key={company}
                  className={`px-3 py-1 rounded-full border text-xs font-medium transition-all duration-150 ${
                    selectedCompanies.includes(company)
                      ? "bg-yellow-400 text-blue-900 border-yellow-400 shadow"
                      : "bg-white text-blue-700 border-blue-300 hover:bg-yellow-50"
                  }`}
                  onClick={() => {
                    if (selectedCompanies.includes(company)) {
                      setSelectedCompanies((prev) =>
                        prev.filter((c) => c !== company)
                      );
                    } else {
                      setSelectedCompanies((prev) => [...prev, company]);
                    }
                  }}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>
          {/* Category Page Links */}
          <div className="mb-2 border-t pt-5 border-blue-100">
            <h4 className="text-lg font-semibold mb-3 text-blue-700">
              Category Pages
            </h4>
            <div className="flex flex-col gap-2">
              {CATEGORY_LIST.map((cat) => (
                <Link
                  key={cat}
                  to={`/shop/${cat.toLowerCase()}`}
                  className={`text-blue-600 hover:underline ${
                    selectedCategory === cat ? "font-bold underline" : ""
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat} Page
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 px-5">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.03] transition-all duration-200 border border-blue-100 flex flex-col items-stretch mx-auto"
                style={{
                  width: 260,
                  height: 340,
                  minWidth: 260,
                  minHeight: 340,
                  maxWidth: 260,
                  maxHeight: 340,
                }}
              >
                <div
                  className="h-44 flex items-center justify-center relative p-1"
                  style={{ backgroundColor: product.bgcolor }}
                >
                  <img
                    src={
                      product.image?.data
                        ? `data:${
                            product.image.contentType || "image/jpeg"
                          };base64,${product.image.data}`
                        : "/vite.svg"
                    }
                    alt={product.name}
                    className="h-36 object-contain drop-shadow-lg mx-auto"
                  />
                  {/* Badges */}
                  <div className="absolute top-1 left-1 flex gap-1 z-10">
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold shadow">
                      {product.company}
                    </span>
                    <span className="bg-yellow-400 text-blue-900 text-xs px-2 py-0.5 rounded-full font-semibold shadow">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div
                  className="p-2 flex flex-col flex-1 justify-between"
                  style={{
                    backgroundColor: product.panelcolor,
                    color: product.textcolor,
                  }}
                >
                  <h3
                    className="text-base font-bold mb-1 truncate"
                    title={product.name}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-red-500 font-bold text-base">
                      ₹{product.price - product.discount}
                    </span>
                    <span className="text-gray-400 line-through text-xs">
                      ₹{product.price}
                    </span>
                    <span className="text-green-500 text-xs font-medium ml-1">
                      (₹{product.discount} off)
                    </span>
                  </div>

                  <form
                    className="mt-auto flex items-center gap-1"
                    onSubmit={(e) => handleAddToCart(e, product._id)}
                  >
                    <input
                      type="number"
                      name="quantity"
                      defaultValue={1}
                      min="1"
                      className="w-12 border border-gray-300 rounded px-1 py-0.5 focus:ring-2 focus:ring-blue-400 text-sm"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors font-semibold text-sm"
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
