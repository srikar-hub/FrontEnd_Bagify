import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-gray-300 text-sm leading-relaxed">
              We're dedicated to providing exceptional service and innovative
              solutions to meet your needs. Join us in creating something
              amazing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-google text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Shop
                  </a>
                </li>
                <li>
                  <a
                    href="/myaccount"
                    className="text-gray-400 hover:text-white transition"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                Contact Info
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="tel:+1234567890"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <i className="fas fa-phone-alt mr-2"></i>
                    (123) 456-7890
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@example.com"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    info@example.com
                  </a>
                </li>
                <li>
                  <div className="text-gray-400 flex items-start">
                    <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                    <span>
                      123 Business Ave,
                      <br />
                      Suite 100,
                      <br />
                      New York, NY 10001
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 Your Brand Name. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-white transition"
              >
                Terms &amp; Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
