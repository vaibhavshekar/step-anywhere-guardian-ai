import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Search, MapPin, ShieldCheck } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ShieldCheck className="h-8 w-8 text-brand-purple" />
          <span className="text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-purple-dark bg-clip-text text-transparent">
            Step Anywhere
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium text-foreground hover:text-brand-purple transition-colors">
            Home
          </Link>
          <Link to="/destinations" className="text-sm font-medium text-foreground hover:text-brand-purple transition-colors">
            Destinations and Safety Guide
          </Link>
          
          
          {/* <Link to="/safety-guide" className="text-sm font-medium text-foreground hover:text-brand-purple transition-colors">
            Safety Guide
          </Link> */}
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          <Button variant="outline" size="sm" className="hidden md:flex">
            <User className="h-4 w-4 mr-2" />
            Sign In
          </Button>
          
          <Button className="hidden md:flex bg-brand-purple hover:bg-brand-purple-dark text-white">
            <MapPin className="h-4 w-4 mr-2" />
            Book Now
          </Button>
          
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isMenuOpen ? "hidden" : "block"}>
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isMenuOpen ? "block" : "hidden"}>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && <div className="md:hidden border-t border-border">
          <div className="container py-4 space-y-4">
            <Link to="/" className="block text-sm font-medium text-foreground">
              Home
            </Link>
            <Link to="/destinations" className="block text-sm font-medium text-foreground">
              Destinations
            </Link>
            <Link to="/flights" className="block text-sm font-medium text-foreground">
              Flights
            </Link>
            <Link to="/hotels" className="block text-sm font-medium text-foreground">
              Hotels
            </Link>
            <Link to="/safety-guide" className="block text-sm font-medium text-foreground">
              Safety Guide
            </Link>
            <div className="pt-4 flex flex-col space-y-2">
              <Button variant="outline" className="justify-start">
                <User className="h-4 w-4 mr-2" />
                Sign In
              </Button>
              <Button className="justify-start bg-brand-purple hover:bg-brand-purple-dark text-white">
                <MapPin className="h-4 w-4 mr-2" />
                Book Now
              </Button>
            </div>
          </div>
        </div>}
    </header>;
};
export default Header;