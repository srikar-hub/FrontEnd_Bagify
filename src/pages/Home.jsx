import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  // Add external stylesheets and scripts in index.html or via npm for production
  React.useEffect(() => {
    // Dynamically load Remixicon and Google Fonts if not already present
    const remix = document.createElement("link");
    remix.rel = "stylesheet";
    remix.href =
      "https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css";
    document.head.appendChild(remix);

    const pacifico = document.createElement("link");
    pacifico.rel = "stylesheet";
    pacifico.href =
      "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    document.head.appendChild(pacifico);

    // Add custom style for .!rounded-button and .ri-
    const style = document.createElement("style");
    style.innerHTML = `:where([class^="ri-"])::before { content: "\\f3c2"; }\n.!rounded-button { border-radius: 8px !important; }`;
    document.head.appendChild(style);

    // Optionally load Tailwind via CDN for demo (not for production)
    const tw = document.createElement("script");
    tw.src = "https://cdn.tailwindcss.com/3.4.16";
    document.head.appendChild(tw);

    // Tailwind config
    tw.onload = () => {
      if (window.tailwind) {
        window.tailwind.config = {
          theme: {
            extend: {
              colors: {
                primary: "#1a237e",
                secondary: "#ffc107",
              },
              borderRadius: {
                none: "0px",
                sm: "4px",
                DEFAULT: "8px",
                md: "12px",
                lg: "16px",
                xl: "20px",
                "2xl": "24px",
                "3xl": "32px",
                full: "9999px",
                button: "8px",
              },
            },
          },
        };
      }
    };

    return () => {
      document.head.removeChild(remix);
      document.head.removeChild(pacifico);
      document.head.removeChild(style);
      document.head.removeChild(tw);
    };
  }, []);

  // Navigation button handlers
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  // Smooth scrolling for anchor links
  React.useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    function smoothScroll(e) {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    links.forEach((link) => link.addEventListener("click", smoothScroll));
    return () =>
      links.forEach((link) => link.removeEventListener("click", smoothScroll));
  }, []);

  return (
    <div className="bg-white">
      {/* Navbar removed as per requirements */}

      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://readdy.ai/api/search-image?query=modern%20premium%20leather%20bags%20collection%20displayed%20on%20elegant%20minimalist%20white%20background%20with%20soft%20natural%20lighting%20professional%20product%20photography%20clean%20aesthetic%20luxury%20handbags%20backpacks%20travel%20bags%20arranged%20artistically%20with%20subtle%20shadows&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-60"></div>
        <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover Stylish & Durable Bags at{" "}
                  <span className="text-primary">Bagify</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  From everyday essentials to travel companions, we curate
                  premium bags that blend style, functionality, and
                  affordability. Every bag tells a story of craftsmanship and
                  quality.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 !rounded-button whitespace-nowrap text-lg font-semibold"
                  onClick={handleLogin}
                >
                  Login
                </button>
                <button
                  className="px-8 py-4 bg-primary text-white hover:bg-opacity-90 transition-colors duration-200 !rounded-button whitespace-nowrap text-lg font-semibold"
                  onClick={handleSignup}
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://readdy.ai/api/search-image?query=collection%20of%20premium%20bags%20including%20leather%20backpack%20designer%20handbag%20laptop%20bag%20travel%20duffel%20bag%20arranged%20in%20artistic%20composition%20with%20soft%20studio%20lighting%20clean%20white%20background%20professional%20product%20photography%20modern%20minimalist%20style&width=600&height=700&seq=hero-img-001&orientation=portrait"
                alt="Premium Bag Collection"
                className="w-full h-auto object-cover object-top rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">About Us</h2>
            <p className="text-2xl text-secondary font-semibold">
              Crafted with passion. Delivered with care.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Our Story</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Bagify, we believe that the perfect bag is more than just an
                accessory – it's your daily companion, your style statement, and
                your trusted partner in every journey. Founded with a passion
                for quality craftsmanship and timeless design, we've made it our
                mission to bring you bags that don't just look good, but stand
                the test of time.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Every bag in our collection is carefully selected for its
                durability, functionality, and aesthetic appeal. We work with
                skilled artisans and trusted manufacturers to ensure that each
                piece meets our high standards of quality while remaining
                accessible to everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-award-line text-white text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Premium Quality
                </h4>
                <p className="text-gray-600">
                  Carefully curated materials and expert craftsmanship in every
                  bag.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-price-tag-3-line text-white text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Affordable Luxury
                </h4>
                <p className="text-gray-600">
                  High-end style and quality without the premium price tag.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-truck-line text-white text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Fast Delivery
                </h4>
                <p className="text-gray-600">
                  Quick and secure shipping to get your perfect bag to you
                  faster.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center mb-4">
                  <i className="ri-customer-service-2-line text-white text-xl"></i>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">
                  Expert Support
                </h4>
                <p className="text-gray-600">
                  Dedicated customer service to help you find your perfect
                  match.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Find Your Perfect Bag?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied customers who've found their ideal bags
            with Bagify.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-8 py-4 bg-white text-primary hover:bg-gray-100 transition-colors duration-200 !rounded-button whitespace-nowrap text-lg font-semibold"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="px-8 py-4 bg-secondary text-white hover:bg-opacity-90 transition-colors duration-200 !rounded-button whitespace-nowrap text-lg font-semibold"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="font-['Pacifico'] text-2xl text-primary">
                Bagify
              </div>
              <p className="text-gray-600">
                Your trusted destination for stylish, durable, and affordable
                bags. Crafted with passion, delivered with care.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="ri-facebook-fill text-white text-sm"></i>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="ri-twitter-fill text-white text-sm"></i>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <i className="ri-instagram-fill text-white text-sm"></i>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">
                Contact Info
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-mail-line text-gray-600"></i>
                  </div>
                  <span className="text-gray-600">hello@bagify.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-phone-line text-gray-600"></i>
                  </div>
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-map-pin-line text-gray-600"></i>
                  </div>
                  <span className="text-gray-600">New York, NY 10001</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              &copy; 2025 Bagify. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
