import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Contact Us</h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-6 text-center">
        Have questions or need support? Reach out to us using the information
        below or fill out our contact form.
      </p>
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-2 text-blue-800">
          Contact Information
        </h2>
        <ul className="text-gray-600 mb-4">
          <li>
            <strong>Phone:</strong> (123) 456-7890
          </li>
          <li>
            <strong>Email:</strong> info@example.com
          </li>
          <li>
            <strong>Address:</strong> 123 Business Ave, Suite 100, New York, NY
            10001
          </li>
        </ul>
        <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Your Name"
            className="border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border rounded px-3 py-2"
            required
          />
          <textarea
            placeholder="Your Message"
            className="border rounded px-3 py-2"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded px-4 py-2 font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
