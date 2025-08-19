
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background text-foreground border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Sri Sharada Press logo" className="h-14 w-14 md:h-16 md:w-16 rounded-full" />
              <h3 className="text-xl font-bold">Sri Sharada Press</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Your one-stop solution for all flex printing and design needs. Quality service with quick turnaround times.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Banner Printing</li>
              <li className="text-muted-foreground">Wedding Card Design</li>
              <li className="text-muted-foreground">Flyers & Pamphlets</li>
              <li className="text-muted-foreground">Visiting Cards</li>
              <li className="text-muted-foreground">One-way Vision Stickers</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className="text-muted-foreground">Shop No. 4, Pampatii Plaza, Gowliguda, Hyderabad – 12</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">+91 9391011520</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">venu.min@gmail.com</span>
              </div>
            </div>

          </div>

        </div>

        <div className="border-t mt-8 pt-6 text-center text-muted-foreground">
          <p>&copy; {currentYear} Sri Sharada Press. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

