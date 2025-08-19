
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-brand-dark-cyan-300 shadow-sm">
      <div className="container mx-auto px-4 text-foreground">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Sri Sharada Press logo" className="h-16 w-16 md:h-18 md:w-18 rounded-full" />
            <span className="text-3xl md:text-4xl font-bold text-foreground">Sri Sharada Press</span>
          </Link>

          {/* Desktop Menu + CTA grouped right */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
            <Button asChild>
              <Link to="/booking">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/80 dark:bg-black/50 backdrop-blur-md text-foreground border-t border-white/20 dark:border-white/10">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <div className="flex flex-col space-y-3">
              <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
            </div>
            <Button className="w-full" asChild>
              <Link to="/booking" onClick={() => setIsMenuOpen(false)}>Book Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

interface NavLinksProps {
  mobile?: boolean;
  onClick?: () => void;
}

const NavLinks = ({ mobile, onClick }: NavLinksProps) => {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.label}
          to={link.to}
          className={`${mobile ? "block py-2 border-b border-white/20 dark:border-white/10 font-medium" : "text-foreground hover:text-primary transition-colors font-medium"}`}
          onClick={onClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
