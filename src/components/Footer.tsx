import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { SlSocialTwitter } from "react-icons/sl";
import { PiWhatsappLogoLight } from "react-icons/pi";
import { SlSocialYoutube } from "react-icons/sl";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-y sticky">
      <div className="max-w-screen-lg py-10 px-4 sm:px-6 sm:flex justify-between mx-auto">
        <div className="p-5 sm:w-2/12 border-r border-gray-700">
          <div className="text-sm uppercase text-indigo-400 font-bold">
            Menu
          </div>
          <ul>
            <li className="my-2">
              <Link className="hover:text-indigo-400 hover:underline" href="/">
                Home
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="hover:text-indigo-400  hover:underline"
                href="/products"
              >
                Products
              </Link>
            </li>
            <li className="my-2">
              <Link
                className="hover:text-indigo-400  hover:underline"
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="p-5 sm:w-7/12 border-r border-gray-700 text-center">
          <h3 className="font-bold text-xl text-indigo-400 mb-4">
            Componential
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-10">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>
        <div className="p-5 sm:w-3/12">
          <div className="text-sm uppercase text-indigo-400 font-bold">
            Contact Us
          </div>
          <ul>
            <li className="my-2">
              <a className="hover:text-indigo-400" href="#">
                XXX XXXX, Floor 4 San Francisco, CA
              </a>
            </li>
            <li className="my-2">
              <a className="hover:text-indigo-400" href="#">
                contact@company.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex py-5 m-auto text-gray-400 text-sm flex-col items-center border-t border-gray-700 max-w-screen-xl">
        <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
          <a href="#" className="w-6 mx-1">
            <PiWhatsappLogoLight className="text-xl text-gray-400 hover:text-indigo-400" />
          </a>
          <a href="#" className="w-6 mx-1">
            <SlSocialInstagram className="text-lg text-gray-400 hover:text-indigo-400" />
          </a>
          <a href="#" className="w-6 mx-1">
            <SlSocialTwitter className="text-lg text-gray-400 hover:text-indigo-400" />
          </a>
          <a href="#" className="w-6 mx-1">
            <SlSocialYoutube className="text-xl text-gray-400 hover:text-indigo-400" />
          </a>
        </div>
        <div className="my-5">© Copyright 2025. All Rights Reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
