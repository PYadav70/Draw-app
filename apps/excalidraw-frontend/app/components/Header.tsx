"use client"
import React, { useState, useEffect } from 'react';
import { Pencil, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2">
            <Pencil 
              className={`w-8 h-8 ${isScrolled ? 'text-blue-600' : 'text-blue-500'}`} 
              strokeWidth={1.5} 
            />
            <span className={`text-xl font-bold ${
              isScrolled ? 'text-gray-800' : 'text-gray-800'
            }`}>Sketchify</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks isScrolled={isScrolled} />
            <button className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
              Start Drawing
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-lg py-4 px-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col space-y-4">
            <MobileNavLinks onItemClick={() => setMobileMenuOpen(false)} />
            <button className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-medium transition-colors">
              Start Drawing
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  isScrolled?: boolean;
  onItemClick?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isScrolled }) => {
  const linkStyle = `font-medium transition-colors hover:text-blue-600 ${
    isScrolled ? 'text-gray-800' : 'text-gray-800'
  }`;

  return (
    <>
      <a href="#features" className={linkStyle}>Features</a>
      <a href="#demo" className={linkStyle}>Demo</a>
      <a href="#testimonials" className={linkStyle}>Testimonials</a>
      <a href="#faq" className={linkStyle}>FAQ</a>
    </>
  );
};

const MobileNavLinks: React.FC<NavLinksProps> = ({ onItemClick }) => {
  return (
    <>
      <a href="#features" className="font-medium text-gray-800" onClick={onItemClick}>Features</a>
      <a href="#demo" className="font-medium text-gray-800" onClick={onItemClick}>Demo</a>
      <a href="#testimonials" className="font-medium text-gray-800" onClick={onItemClick}>Testimonials</a>
      <a href="#faq" className="font-medium text-gray-800" onClick={onItemClick}>FAQ</a>
    </>
  );
};

export default Header;