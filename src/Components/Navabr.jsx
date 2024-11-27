import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md flex items-center">
        <a
          href="/"
          className="text-gray-800 text-2xl font-bold hover:text-gray-600"
        >
          Academia
        </a>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center">

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-800 focus:outline-none md:hidden"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        <div
          className={`absolute md:static top-16 left-0 md:top-0 bg-white md:bg-transparent 
          w-full md:w-auto transition-all duration-500 ease-in-out 
          transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <button
              onClick={() => navigate("/bills")}
              className="text-gray-800 text-lg font-medium hover:text-blue-600 transition"
            >
              Bills
            </button>
          </div>
        </div>
        <div
          className={`absolute md:static top-16 left-0 md:top-0 bg-white md:bg-transparent 
          w-full md:w-auto transition-all duration-500 ease-in-out 
          transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
        >
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6 p-4 md:p-0">
            <button
              onClick={() => navigate("/")}
              className="text-gray-800 text-lg font-medium hover:text-blue-600 transition"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
