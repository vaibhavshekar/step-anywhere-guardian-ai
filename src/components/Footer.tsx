
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Facebook, Twitter, Instagram, Mail } from 'lucide-react';
const Footer = () => {
  return <footer className="pt-12 pb-8 bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-6 w-6 text-brand-purple" />
              <span className="text-lg font-bold bg-gradient-to-r from-brand-purple to-brand-purple-dark bg-clip-text text-transparent">
                Step Anywhere
              </span>
            </div>
            <p className="text-sm text-gray-400">
              Travel safely with confidence and discover the world while staying informed about your destination.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-purple">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-gray-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-brand-purple">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-sm text-gray-400 hover:text-brand-purple">Destinations</Link>
              </li>
              <li>
                <Link to="/flights" className="text-sm text-gray-400 hover:text-brand-purple">Flights</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-sm text-gray-400 hover:text-brand-purple">Hotels</Link>
              </li>
              <li>
                <Link to="/safety-guide" className="text-sm text-gray-400 hover:text-brand-purple">Safety Guide</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-gray-300">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us" className="text-sm text-gray-400 hover:text-brand-purple">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-brand-purple">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-400 hover:text-brand-purple">FAQs</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-brand-purple">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-brand-purple">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-4 uppercase tracking-wider text-gray-300">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-4">
              Get safety alerts and travel tips directly to your inbox.
            </p>
            <div className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 text-sm rounded-l border border-gray-600 bg-gray-800 text-white focus:outline-none focus:border-brand-purple flex-grow" />
              <button className="bg-brand-purple text-white px-4 py-2 text-sm rounded-r hover:bg-brand-purple-dark">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800">
          <p className="text-sm text-center text-gray-400">
            © {new Date().getFullYear()} Step Anywhere. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;
