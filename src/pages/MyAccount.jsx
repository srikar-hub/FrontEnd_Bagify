import React from "react";

const AccountPage = () => {
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Account</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <script src="https://cdn.tailwindcss.com/3.4.5?plugins=forms@0.5.7,typography@0.5.13,aspect-ratio@0.4.2,container-queries@0.1.1"></script>
      </head>
      <body className="bg-gray-50 font-['Inter']">
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center"></div>
              </div>
              <div className="flex items-center">
                <button className="!rounded-button bg-custom text-white px-4 py-2 text-sm font-medium">
                  <i className="fas fa-sign-out-alt mr-2"></i>Logouts
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm">
                <nav className="space-y-1 p-4">
                  <a
                    href="#"
                    className="flex items-center px-4 py-3 text-sm font-medium text-custom bg-gray-50 rounded-lg"
                  >
                    <i className="fas fa-user-circle mr-3"></i>
                    Account Overview
                  </a>
                </nav>
              </div>
            </aside>

            <main className="flex-1">
              <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                  Welcome back, John Doe
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Manage your account settings and preferences
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <div className="mt-1 text-sm text-gray-900">John Doe</div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="mt-1 text-sm text-gray-900">
                        johndoe@example.com
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <div className="mt-1 text-sm text-gray-900">
                        +1 (555) 123-4567
                      </div>
                    </div>
                    <button className="!rounded-button mt-4 bg-custom text-white px-4 py-2 text-sm font-medium">
                      Edit Information
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Address Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Shipping Address
                      </label>
                      <div className="mt-1 text-sm text-gray-900">
                        Jane Doe
                        <br />
                        1234 Main St
                        <br />
                        Apt 101
                        <br />
                        New Delhi, Delhi
                        <br />
                        India
                      </div>
                    </div>
                    <button className="!rounded-button mt-4 bg-custom text-white px-4 py-2 text-sm font-medium">
                      Edit Address
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Orders
                    </h3>
                    <i className="fas fa-shopping-cart text-gray-400"></i>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-custom">12</p>
                  <p className="mt-1 text-sm text-gray-600">Total Orders</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Wishlist
                    </h3>
                    <i className="fas fa-heart text-gray-400"></i>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-custom">5</p>
                  <p className="mt-1 text-sm text-gray-600">Saved Items</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Reviews
                    </h3>
                    <i className="fas fa-star text-gray-400"></i>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-custom">8</p>
                  <p className="mt-1 text-sm text-gray-600">Product Reviews</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">
                      Points
                    </h3>
                    <i className="fas fa-gift text-gray-400"></i>
                  </div>
                  <p className="mt-2 text-2xl font-semibold text-custom">250</p>
                  <p className="mt-1 text-sm text-gray-600">Reward Points</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </body>
    </>
  );
};

export default AccountPage;
