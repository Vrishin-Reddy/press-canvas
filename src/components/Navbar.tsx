
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home as HomeIcon, Layers, FileText, Phone, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// 

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(p);
      setScrolled(scrollTop > 10);
      if (prefersReduced) return;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return { progress, scrolled };
}

const Navbar = () => {
  const { pathname } = useLocation();
  const { progress, scrolled } = useScrollProgress();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Close mobile on route change and restore focus to trigger
    if (open) setOpen(false);
    if (triggerRef.current) triggerRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const isActive = (to: string) => {
    return pathname === to;
  };

  const linkClass = (active: boolean) =>
    `relative font-medium transition-colors ${
      active ? "text-primary" : "hover:text-primary"
    } after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-brand-dark-cyan-500 after:via-brand-tangerine-500 after:to-brand-jasper-500 after:transition-all ${
      active ? "after:w-full" : "hover:after:w-full"
    }`;

  // Ensure navbar height matches or exceeds the logo size
  const navHeightClass = "h-16 md:h-24";
  const shadowClass = scrolled ? "shadow-sm" : "shadow-none";
  const accentOpacity = scrolled ? "opacity-100" : "opacity-0";

  // 

  return (
    <header className="sticky top-0 z-50">
      {/* Top gradient accent bar that fades in on scroll */}
      <div className={`h-0.5 bg-gradient-to-r from-brand-dark-cyan-500 via-brand-tangerine-500 to-brand-jasper-500 transition-opacity ${accentOpacity}`} />

      <nav role="navigation" aria-label="Primary" className={`bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-brand-dark-cyan-300/40 ${shadowClass}`}>
        {/* Scroll progress bar */}
        <div className="absolute inset-x-0 top-0 h-0.5">
          <div className="h-full bg-brand-tangerine-500 transition-[width] duration-200" style={{ width: `${progress}%` }} />
        </div>

        <div className={`container mx-auto px-4 ${navHeightClass} motion-safe:transition-[height] flex items-center justify-between`}>
          {/* Left: Brand */}
          <Link to="/" className="inline-flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
            <img src="/logo.png" alt="Sri Sharada Press logo" className="h-12 w-12 sm:h-16 sm:w-16 md:h-24 md:w-24 rounded-full object-cover ring-1 ring-muted/30" />
            <span className="font-heading text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-brand-dark-cyan-500 via-brand-tangerine-500 to-brand-jasper-500 bg-clip-text text-transparent">Sri Sharada Press</span>
          </Link>

          {/* Right: Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" aria-current={isActive("/") ? "page" : undefined} className={linkClass(isActive("/")) + " inline-flex items-center gap-2 text-base md:text-lg"}>
              <HomeIcon className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              <span>Home</span>
            </Link>

            <Link to="/services" aria-current={isActive("/services") ? "page" : undefined} className={linkClass(isActive("/services")) + " inline-flex items-center gap-2 text-base md:text-lg"}>
              <Layers className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              <span>Services</span>
            </Link>

            <Link to="/about" aria-current={isActive("/about") ? "page" : undefined} className={linkClass(isActive("/about")) + " inline-flex items-center gap-2 text-base md:text-lg"}>
              <FileText className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              <span>About Us</span>
            </Link>
            <Link to="/contact" aria-current={isActive("/contact") ? "page" : undefined} className={linkClass(isActive("/contact")) + " inline-flex items-center gap-2 text-base md:text-lg"}>
              <Phone className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
              <span>Contact</span>
            </Link>

            <Button asChild className="bg-[#588B8B] hover:bg-[#588B8B]/90 text-brand-white focus-visible:ring-2 focus-visible:ring-brand-dark-cyan-500/40 focus-visible:ring-offset-2 font-bold text-base md:text-lg">
              <Link to="/booking" className="inline-flex items-center gap-2">
                <ArrowRight className="h-4 w-4 md:h-5 md:w-5" aria-hidden />
                <span>Book Now</span>
              </Link>
            </Button>
          </div>

          {/* Right: Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button ref={triggerRef} variant="ghost" size="icon" aria-controls="mobile-menu" aria-expanded={open} aria-label="Toggle menu">
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85vw] sm:w-[380px] p-0 backdrop-blur-md">
                <div id="mobile-menu" className="flex h-full flex-col">
                  <div className="px-4 py-4 border-b">
                    <Link to="/" onClick={() => setOpen(false)} className="inline-flex items-center gap-3">
                      <img src="/logo.png" alt="Sri Sharada Press logo" className="h-10 w-10 rounded-full object-cover ring-1 ring-muted/30" />
                      <span className="text-lg font-semibold tracking-tight">Sri Sharada Press</span>
                    </Link>
                  </div>
                  <nav className="flex-1 px-4 py-4 space-y-1">
                    <Link to="/" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-muted/40">Home</Link>
                    <Link to="/services" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-muted/40">Services</Link>
                    <Link to="/about" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-muted/40">About Us</Link>
                    <Link to="/contact" onClick={() => setOpen(false)} className="block px-2 py-2 rounded-md hover:bg-muted/40">Contact</Link>
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <Button asChild className="w-full bg-[#588B8B] hover:bg-[#588B8B]/90 text-brand-white font-bold">
                      <Link to="/booking" onClick={() => setOpen(false)}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
