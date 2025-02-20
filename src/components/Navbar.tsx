"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLogin = session?.user;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Left Side - Logo */}
        <Link
          href="/"
          className="text-xl font-semibold text-gray-900 dark:text-white"
        >
          NextGenElectronics
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side - Profile & Get Started */}
        <div className="flex items-center gap-4">
          {/* Profile Avatar - Only if logged in */}
          {isLogin && (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsDropdownOpen(!isDropdownOpen);
                  setIsMenuOpen(false);
                }}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <img
                  className="w-8 h-8 rounded-full"
                  src={
                    session.user?.image ||
                    "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  }
                  alt="User Avatar"
                />
              </button>

              {/* Profile Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {session.user?.name}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                      {session.user?.email}
                    </span>
                  </div>
                  <ul className="py-2">
                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          toast.success("Logged out successfully");
                          signOut();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Get Started Button - Only in Desktop */}
          {!isLogin && (
            <div className="hidden lg:block">
              <Link
                href="/sign-up"
                className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              setIsDropdownOpen(false);
            }}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-100 dark:bg-gray-800">
          <ul className="flex flex-col items-center py-4 space-y-4">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-purple-700 dark:text-gray-300 dark:hover:text-white"
                >
                  {link.name}
                </Link>
              </li>
            ))}
            {!isLogin && (
              <li>
                <Link
                  href="/sign-up"
                  className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 dark:bg-purple-600 dark:hover:bg-purple-700"
                >
                  Get Started
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
