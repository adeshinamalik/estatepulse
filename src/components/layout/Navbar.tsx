
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserCircle2, Menu } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">EstatePulse</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <Link to="/report-issue" className="hover:text-secondary transition-colors">Report Issue</Link>
            <Link to="/announcements" className="hover:text-secondary transition-colors">Announcements</Link>
            <Link to="/manager">
              <Button variant="outline" className="bg-white">
                <UserCircle2 className="mr-2" />
                Manager Login
              </Button>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col space-y-2">
            <Link 
              to="/" 
              className="hover:bg-primary-foreground/10 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/report-issue" 
              className="hover:bg-primary-foreground/10 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Report Issue
            </Link>
            <Link 
              to="/announcements" 
              className="hover:bg-primary-foreground/10 px-3 py-2 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Announcements
            </Link>
            <Link 
              to="/manager"
              onClick={() => setIsMenuOpen(false)}
              className="px-3 py-2"
            >
              <Button variant="outline" className="w-full bg-white">
                <UserCircle2 className="mr-2" />
                Manager Login
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
