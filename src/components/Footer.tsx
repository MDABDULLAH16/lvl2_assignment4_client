import { Link } from "react-router-dom";
import logo2 from "../assets/logo2.png";
import { FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Footer Logo and Info */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <img src={logo2} alt="FitGearHub" className="w-32 mb-4" />
          <p className="font-semibold text-lg mb-2">ARS Limited</p>
          <p className="text-sm mb-4">Providing reliable tech since 2020</p>
          <p className="text-xs">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </div>

        {/* Important Pages */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h6 className="text-lg font-semibold mb-3">Important Pages</h6>
          <ul className="space-y-2">
            <li>
              <Link to="/products" className="hover:text-gray-300">
                Products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-gray-300">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/product-details" className="hover:text-gray-300">
                Product Details
              </Link>
            </li>
            <li>
              <Link to="/checkout" className="hover:text-gray-300">
                Checkout
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
          </ul>
        </div>

        {/* For Contact */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h6 className="text-lg font-semibold mb-3">For Contact</h6>
          <ul className="space-y-2">
            <li className="flex items-center">
              <a
                href="https://facebook.com"
                className="flex items-center hover:text-gray-300"
              >
                Facebook
                <FaFacebook className="ml-2 text-blue-600 bg-white rounded-full text-xl" />
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://youtube.com"
                className="flex items-center hover:text-gray-300"
              >
                YouTube
                <FaYoutube className="text-red-500 text-2xl ml-2" />
              </a>
            </li>
            <li className="flex items-center">
              <a
                href="https://linkedin.com"
                className="flex items-center hover:text-gray-300"
              >
                LinkedIn
                <FaLinkedin className="ml-2 text-blue-800 rounded-box text-xl" />
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0">
          <h6 className="text-lg font-semibold mb-3">Legal</h6>
          <ul className="space-y-2">
            <li>
              <a href="/terms" className="hover:text-gray-300">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-gray-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-gray-300">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
