import React from "react";

const CartPage = () => {
  return (
    <>
      {/* Header */}
      {/* <Header /> */}

      {/* Flash Messages */}
      {/* Replace with useState for actual behavior */}
      <div
        id="flash-message-error"
        className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-red-500"
      >
        <span className="text-white">An error occurred</span>
      </div>

      <div
        id="flash-message-success"
        className="absolute top-5 left-1/2 -translate-x-1/2 p-3 rounded-md bg-green-500"
      >
        <span className="text-white">Item added successfully</span>
      </div>

      <div className="w-full min-h-screen flex flex-col px-20 py-10 gap-10">
        <h2 className="text-3xl font-bold mb-5">MY Cart</h2>

        <form id="checkout-form" onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-10">
            {/* Product List */}
            <div className="w-[65%] flex flex-col gap-8">
              <div className="w-full flex items-start gap-5 rounded-md overflow-hidden bg-[#f4f4f4] p-5 relative">
                <input
                  type="checkbox"
                  className="cart-checkbox mt-20 ml-2"
                  data-price="180"
                  data-mrp="200"
                  data-discount="20"
                  onChange={() => {}}
                />

                <a
                  href="#"
                  className="absolute top-5 text-red-500 hover:text-red-700"
                >
                  <i className="ri-close-circle-line text-2xl"></i>
                </a>

                {/* Product Image */}
                <div className="w-40 h-40 flex items-center justify-center bg-white rounded-md">
                  <img
                    className="w-full h-full object-contain"
                    src="https://via.placeholder.com/150"
                    alt="Product"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-[#333]">
                    Sample Product Name
                  </h3>
                  <p className="text-sm text-gray-600">Price: ₹200</p>
                  <p className="text-sm text-gray-600">Discount: ₹20</p>
                </div>

                {/* Total Price */}
                <div className="flex items-center justify-end">
                  <h4 className="text-lg font-semibold text-green-600">₹180</h4>
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="w-[35%] rounded-md bg-white shadow-md p-5">
              <h3 className="text-xl font-semibold mb-5">Price Breakdown</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span id="total-mrp">₹ 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Discount</span>
                  <span id="total-discount">₹ 0</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹ 20</span>
                </div>
                <div className="w-full h-[1px] bg-gray-200 my-5"></div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span id="total-price">₹ 0</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-3 mt-5"
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
