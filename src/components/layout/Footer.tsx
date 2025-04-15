
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-8 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">EstatePulse</span>
            <p className="text-sm opacity-80">Simplifying property management for Nigerian estates</p>
          </div>
          
          <div className="flex flex-col text-sm opacity-80">
            <div className="flex items-center justify-center md:justify-end">
              Made with <Heart className="h-4 w-4 mx-1 text-red-400 fill-red-400" /> in Nigeria
            </div>
            <div>© {new Date().getFullYear()} EstatePulse</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
