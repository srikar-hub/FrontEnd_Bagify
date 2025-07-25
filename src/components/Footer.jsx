import React from "react";
import { Link } from "react-router-dom";

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
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <a
                    href="#privacy"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#terms"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-400 hover:text-white transition"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Contact
                  </Link>
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
                    href="tel:+919618420523"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <i className="fas fa-phone-alt mr-2"></i>
                    9618420523
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:koppunoorisrikar@gmail.com"
                    className="text-gray-400 hover:text-white transition"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    koppunoorisrikar@gmail.com
                  </a>
                </li>
                <li>
                  <div className="text-gray-400 flex items-start">
                    <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                    <span>
                      Vijayawada,
                      <br />
                      Andhra Pradesh
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
