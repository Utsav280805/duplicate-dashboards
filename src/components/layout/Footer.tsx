
import React from "react";
import { Link } from "react-router-dom";
import { 
  Github, 
  Twitter, 
  Linkedin,
  Facebook, 
  Mail, 
  MessageCircle,
  PhoneCall
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-border/50 pt-16 pb-12 text-slate-600">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-primary mb-6">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                <path d="M12 14v4" />
                <path d="M12 10v.01" />
              </svg>
              <span className="font-bold text-xl">DDAS</span>
            </Link>
            <p className="text-sm text-slate-500 mb-6">
              Eliminate duplicate data and optimize storage with our intuitive data management solution.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="text-slate-400 hover:text-primary transition-colors"
                aria-label="Github"
              >
                <Github size={18} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-slate-400" />
                <a href="mailto:info@ddas.com" className="text-sm hover:text-primary transition-colors">
                  info@ddas.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneCall size={18} className="text-slate-400" />
                <a href="tel:+1234567890" className="text-sm hover:text-primary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle size={18} className="text-slate-400" />
                <Link to="/help" className="text-sm hover:text-primary transition-colors">
                  Live chat
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 mb-4 sm:mb-0">
            © {currentYear} Data Duplication Alert System. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/help" className="text-sm text-slate-500 hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link to="/help" className="text-sm text-slate-500 hover:text-primary transition-colors">
              Terms
            </Link>
            <Link to="/help" className="text-sm text-slate-500 hover:text-primary transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
