
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
              For more than a century, Sri Sharada Press has transformed ideas into print with integrity and innovation. Rooted in heritage, we continue to serve families and businesses with printing that endures.
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
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
              <li><Link to="/booking?service=poster-printing" className="text-muted-foreground hover:text-foreground transition-colors">Poster Printing</Link></li>
              <li><Link to="/booking?service=vinyl-printing" className="text-muted-foreground hover:text-foreground transition-colors">Vinyl Printing</Link></li>
              <li><Link to="/booking?service=foam-board-printing" className="text-muted-foreground hover:text-foreground transition-colors">Foam Board Printing</Link></li>
              <li><Link to="/booking?service=flute-board-printing" className="text-muted-foreground hover:text-foreground transition-colors">Flute Board Printing</Link></li>
              <li><Link to="/booking?service=pullout-standees" className="text-muted-foreground hover:text-foreground transition-colors">Pullout Standees</Link></li>
              <li><Link to="/booking?service=visiting-cards" className="text-muted-foreground hover:text-foreground transition-colors">Visiting Cards</Link></li>
              <li><Link to="/booking?service=flex-banners" className="text-muted-foreground hover:text-foreground transition-colors">Flex Banners</Link></li>
              <li><Link to="/booking?service=letter-pads" className="text-muted-foreground hover:text-foreground transition-colors">Letter Pads</Link></li>
              <li><Link to="/booking?service=wedding-cards" className="text-muted-foreground hover:text-foreground transition-colors">Wedding Cards Printing</Link></li>
              <li><Link to="/booking?service=stickers" className="text-muted-foreground hover:text-foreground transition-colors">Stickers</Link></li>
              <li><Link to="/booking?service=invitation-cards" className="text-muted-foreground hover:text-foreground transition-colors">Invitation Cards</Link></li>
              <li><Link to="/booking?service=greeting-cards" className="text-muted-foreground hover:text-foreground transition-colors">Greeting Cards</Link></li>
              <li><Link to="/booking?service=one-way-vision" className="text-muted-foreground hover:text-foreground transition-colors">One Way Vision Stickers</Link></li>
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

