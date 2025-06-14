import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return <footer className="border-t border-white/10 py-8 mt-16">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-4 flex space-x-6">
          <Link to="/about" className="text-gray-400 hover:text-[#19faff] transition-colors">
            About
          </Link>
          <Link to="/privacy" className="text-gray-400 hover:text-[#19faff] transition-colors">
            Privacy
          </Link>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#19faff] transition-colors">
            GitHub
          </a>
        </div>
        <div className="text-gray-500">© Promptly. 2025</div>
      </div>
    </footer>;
};
export default Footer;