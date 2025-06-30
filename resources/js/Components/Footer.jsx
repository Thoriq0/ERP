import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-sm py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
          <a href="#" className="hover:text-gray-300 transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
